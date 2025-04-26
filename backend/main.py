from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import json
import logging
import sys

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    handlers=[logging.StreamHandler()])

logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORS middleware with explicit settings for mobile app access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"],  # Expose all headers
)

class TikTokUrl(BaseModel):
    url: str
    update_ytdlp: bool = False

# Attempt to update yt-dlp
def update_ytdlp():
    try:
        logger.info("Attempting to update yt-dlp...")
        update_result = subprocess.run(
            ["pip", "install", "--upgrade", "yt-dlp"],
            capture_output=True,
            text=True,
            check=True
        )
        logger.info(f"yt-dlp update output: {update_result.stdout}")
        return True
    except Exception as e:
        logger.error(f"Failed to update yt-dlp: {e}")
        return False

@app.post("/process-tiktok")
async def process_tiktok(tiktok_data: TikTokUrl):
    url = tiktok_data.url
    
    if "tiktok.com" not in url:
        logger.error(f"Invalid URL: {url}")
        raise HTTPException(status_code=400, detail="URL must be a TikTok link")
    
    logger.info(f"Processing TikTok URL: {url}")
    
    # Update yt-dlp if requested
    if tiktok_data.update_ytdlp:
        update_ytdlp()
    
    try:
        # Get yt-dlp version for debugging
        version_result = subprocess.run(
            ["yt-dlp", "--version"],
            capture_output=True,
            text=True
        )
        logger.info(f"Using yt-dlp version: {version_result.stdout.strip()}")
        
        # Run yt-dlp command with more verbose output
        logger.info("Executing yt-dlp command...")
        result = subprocess.run(
            ["yt-dlp", "-j", "--verbose", url],
            capture_output=True,
            text=True,
            check=True
        )
        
        logger.info("Command executed successfully, parsing response...")
        # Parse the JSON output
        video_data = json.loads(result.stdout)
        
        # Extract relevant information
        response = {
            "id": video_data.get("id"),
            "title": video_data.get("title"),
            "description": video_data.get("description"),
            "uploader": video_data.get("uploader"),
            "duration": video_data.get("duration"),
            "view_count": video_data.get("view_count"),
            "like_count": video_data.get("like_count"),
            "timestamp": video_data.get("timestamp")
        }
        
        logger.info(f"Successfully processed TikTok URL: {url}")
        return response
        
    except subprocess.CalledProcessError as e:
        logger.error(f"Error processing URL: {e}")
        logger.error(f"stderr: {e.stderr}")
        logger.error(f"stdout: {e.stdout}")
        
        # If the error suggests using the webpage method, try that as a fallback
        if "using webpage" in e.stderr:
            logger.info("Retrying with webpage method...")
            try:
                fallback_result = subprocess.run(
                    ["yt-dlp", "-j", "--no-check-certificate", "--no-playlist", "--force-generic-extractor", url],
                    capture_output=True,
                    text=True,
                    check=True
                )
                video_data = json.loads(fallback_result.stdout)
                response = {
                    "id": video_data.get("id", "Unknown"),
                    "title": video_data.get("title", "Unknown"),
                    "description": video_data.get("description", "Description unavailable"),
                    "uploader": video_data.get("uploader", "Unknown"),
                    "duration": video_data.get("duration", 0),
                    "view_count": video_data.get("view_count", 0),
                    "like_count": video_data.get("like_count", 0),
                    "timestamp": video_data.get("timestamp", 0)
                }
                logger.info("Successfully processed with fallback method")
                return response
            except Exception as fallback_error:
                logger.error(f"Fallback method also failed: {fallback_error}")
        
        raise HTTPException(status_code=500, detail=f"Error processing TikTok link: {e.stderr}")
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding JSON: {e}")
        raise HTTPException(status_code=500, detail=f"Error parsing video data: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        logger.error(f"Python version: {sys.version}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/update-ytdlp")
async def update_ytdlp_endpoint():
    success = update_ytdlp()
    if success:
        return {"message": "yt-dlp updated successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to update yt-dlp")

@app.get("/")
async def root():
    return {"message": "TikTok Processor API"} 