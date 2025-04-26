# TikTok Processor Backend

A FastAPI backend that extracts information from TikTok links using yt-dlp.

## Prerequisites

- Python 3.7+
- yt-dlp
- FastAPI

## Setup

1. Create a virtual environment (optional but recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the server:

```bash
./start.sh
```

Or manually:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### POST /process-tiktok

Process a TikTok URL and extract information.

**Request Body:**

```json
{
  "url": "https://www.tiktok.com/t/ZP8jvmXVJ/"
}
```

**Response:**

```json
{
  "id": "7489449998338526510",
  "title": "New Must Visit SF Bakery...",
  "description": "New Must Visit SF Bakery 🥐 Although they just recently opened...",
  "uploader": "frankhubakes",
  "duration": 27,
  "view_count": 96400,
  "like_count": 7327,
  "timestamp": 1743773540
}
```

### GET /

Health check endpoint.

**Response:**

```json
{
  "message": "TikTok Processor API"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages for various scenarios:

- 400: Invalid TikTok URL
- 500: Server-side processing error
