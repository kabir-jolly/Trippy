import React, { useState } from 'react';
import { ArrowRight, MapPin, Cloud, Settings, Brain, ChevronDown, Plus } from 'lucide-react';

const TripSmartMockup = () => {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [currentOnboardingPage, setCurrentOnboardingPage] = useState(1);
  const [selectedTrip, setSelectedTrip] = useState(null);
  
  // ... existing code ...

  // Render final itinerary view
  const renderFinalItinerary = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center">
        <button 
          onClick={() => navigateTo('itinerary-planning')}
          className="mr-4"
        >
          <ArrowRight size={24} className="transform rotate-180 text-gray-700" />
        </button>
        <div>
          <h1 className="text-xl font-bold">Your Itinerary</h1>
          <p className="text-gray-600">Barcelona, Spain</p>
        </div>
      </div>
      
      <div className="px-6 flex-1 overflow-auto">
        <div className="bg-white rounded-xl shadow mb-4">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-lg">Day 1 - May 10</h2>
            <p className="text-sm text-gray-600">Arrival Day</p>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex">
              <div className="w-12 text-center">
                <p className="text-sm font-medium">9:00</p>
                <p className="text-xs text-gray-500">AM</p>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-bold">Flax & Kale</h3>
                <p className="text-sm text-gray-600">Breakfast</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MapPin size={12} className="mr-1" />
                  <span>Carrer dels Tallers, 74B</span>
                </div>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-12 text-center">
                <p className="text-sm font-medium">11:30</p>
                <p className="text-xs text-gray-500">AM</p>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-bold">Sagrada Familia</h3>
                <p className="text-sm text-gray-600">Sightseeing</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MapPin size={12} className="mr-1" />
                  <span>Carrer de Mallorca, 401</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex items-center border-t">
        <button 
          className="flex-1 bg-purple-600 rounded-xl py-3 flex items-center justify-center"
          onClick={() => navigateTo('trip-details')}
        >
          <span className="text-white font-medium mr-2">View Trip Details</span>
          <ArrowRight size={18} className="text-white" />
        </button>
      </div>
    </div>
  );

  // Render trip details screen
  const renderTripDetails = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center">
        <button 
          onClick={() => navigateTo('final-itinerary')}
          className="mr-4"
        >
          <ArrowRight size={24} className="transform rotate-180 text-gray-700" />
        </button>
        <div>
          <h1 className="text-xl font-bold">Trip Details</h1>
          <p className="text-gray-600">Barcelona, Spain</p>
        </div>
      </div>
      
      <div className="px-6 flex-1 overflow-auto">
        <div className="bg-white rounded-xl shadow mb-4">
          <div className="p-4">
            <h2 className="font-bold text-lg mb-4">Trip Information</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Trip Name</p>
                <p className="font-medium">Barcelona Adventure</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Dates</p>
                <p className="font-medium">May 10 - May 15, 2025</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Travelers</p>
                <p className="font-medium">3 people</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow mb-4">
          <div className="p-4">
            <h2 className="font-bold text-lg mb-4">Trip Members</h2>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-medium">JD</span>
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">Trip Creator</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-medium">JS</span>
                </div>
                <div>
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-sm text-gray-500">Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex items-center border-t">
        <button 
          className="flex-1 bg-purple-600 rounded-xl py-3 flex items-center justify-center"
          onClick={() => navigateTo('map-view')}
        >
          <span className="text-white font-medium mr-2">View on Map</span>
          <MapPin size={18} className="text-white" />
        </button>
      </div>
    </div>
  );

  // Render map view screen
  const renderMapView = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center">
        <button 
          onClick={() => navigateTo('trip-details')}
          className="mr-4"
        >
          <ArrowRight size={24} className="transform rotate-180 text-gray-700" />
        </button>
        <div>
          <h1 className="text-xl font-bold">Map View</h1>
          <p className="text-gray-600">Barcelona, Spain</p>
        </div>
      </div>
      
      <div className="flex-1 bg-gray-200">
        {/* Map placeholder */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <MapPin size={32} className="text-purple-600 mx-auto mb-2" />
            <p className="text-gray-600">Map View</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex items-center border-t">
        <button 
          className="flex-1 bg-purple-600 rounded-xl py-3 flex items-center justify-center"
          onClick={() => navigateTo('weather')}
        >
          <span className="text-white font-medium mr-2">Check Weather</span>
          <Cloud size={18} className="text-white" />
        </button>
      </div>
    </div>
  );

  // Render weather screen
  const renderWeather = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center">
        <button 
          onClick={() => navigateTo('map-view')}
          className="mr-4"
        >
          <ArrowRight size={24} className="transform rotate-180 text-gray-700" />
        </button>
        <div>
          <h1 className="text-xl font-bold">Weather Forecast</h1>
          <p className="text-gray-600">Barcelona, Spain</p>
        </div>
      </div>
      
      <div className="px-6 flex-1 overflow-auto">
        <div className="bg-white rounded-xl shadow mb-4">
          <div className="p-4">
            <h2 className="font-bold text-lg mb-4">5-Day Forecast</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">May 10</p>
                  <p className="text-sm text-gray-500">Sunny</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">24°C</p>
                  <p className="text-sm text-gray-500">Low: 18°C</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">May 11</p>
                  <p className="text-sm text-gray-500">Partly Cloudy</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">22°C</p>
                  <p className="text-sm text-gray-500">Low: 17°C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex items-center border-t">
        <button 
          className="flex-1 bg-purple-600 rounded-xl py-3 flex items-center justify-center"
          onClick={() => navigateTo('settings')}
        >
          <span className="text-white font-medium mr-2">Settings</span>
          <Settings size={18} className="text-white" />
        </button>
      </div>
    </div>
  );

  // Render settings screen
  const renderSettings = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center">
        <button 
          onClick={() => navigateTo('weather')}
          className="mr-4"
        >
          <ArrowRight size={24} className="transform rotate-180 text-gray-700" />
        </button>
        <div>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </div>
      
      <div className="px-6 flex-1 overflow-auto">
        <div className="bg-white rounded-xl shadow mb-4">
          <div className="p-4">
            <h2 className="font-bold text-lg mb-4">Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-gray-500">Get updates about your trip</p>
                </div>
                <div className="w-12 h-6 bg-purple-600 rounded-full flex items-center justify-end p-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500">Switch to dark theme</p>
                </div>
                <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center p-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow mb-4">
          <div className="p-4">
            <h2 className="font-bold text-lg mb-4">Account</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-medium">JD</span>
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
              </div>
              
              <button className="w-full py-3 text-red-600 font-medium border-t border-gray-100">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Update the itinerary planning screen to navigate to final itinerary
  const renderItineraryPlanning = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center">
        <button 
          onClick={() => navigateTo('content-with-items')}
          className="mr-4"
        >
          <ArrowRight size={24} className="transform rotate-180 text-gray-700" />
        </button>
        <div>
          <h1 className="text-xl font-bold">Itinerary</h1>
          <p className="text-gray-600">Barcelona, Spain</p>
        </div>
      </div>
      
      <div className="p-6 flex-1">
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
              <Brain size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold">Claude is planning your itinerary</h2>
              <p className="text-gray-500 text-sm">Creating the perfect schedule</p>
            </div>
          </div>
          
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-purple-600 rounded-full w-3/5"></div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
            <h3 className="font-medium text-sm mb-1">Time optimization</h3>
            <p className="text-xs text-gray-600 mb-2">
              Accounting for opening hours and visit durations
            </p>
            
            <button className="flex items-center justify-center w-full py-2 border-t border-gray-100 text-sm text-purple-600">
              Show Claude's Thinking <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="flex justify-center">
            <div className="w-2 h-2 rounded-full bg-purple-600 mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-purple-600 mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-purple-600 mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300 mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300 mx-1"></div>
          </div>
        </div>
      </div>

      <div className="p-6 flex items-center border-t">
        <button 
          className="flex-1 bg-purple-600 rounded-xl py-3 flex items-center justify-center"
          onClick={() => navigateTo('final-itinerary')}
        >
          <span className="text-white font-medium mr-2">View Final Itinerary</span>
          <ArrowRight size={18} className="text-white" />
        </button>
      </div>
    </div>
  );

  // Update the content with items screen to navigate to itinerary planning
  const renderContentWithItems = () => (
    <div className="flex flex-col h-full">
      {/* ... existing content ... */}
      
      <div className="p-6 flex items-center border-t">
        <button 
          className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4"
          onClick={() => navigateTo('add-content')}
        >
          <Plus size={24} className="text-white" />
        </button>
        
        <button 
          className="flex-1 bg-purple-600 rounded-xl py-3 flex items-center justify-center"
          onClick={() => navigateTo('itinerary-planning')}
        >
          <span className="text-white font-medium mr-2">Continue to Planning</span>
          <ArrowRight size={18} className="text-white" />
        </button>
      </div>
    </div>
  );

  // Update the renderContent function to include new screens
  const renderContent = () => {
    switch (currentScreen) {
      case 'onboarding':
        return renderOnboarding();
      case 'create-trip':
        return renderCreateTrip();
      case 'content-empty':
        return renderEmptyContent();
      case 'add-content':
        return renderAddContent();
      case 'content-analysis':
        return renderContentAnalysis();
      case 'content-with-items':
        return renderContentWithItems();
      case 'itinerary-planning':
        return renderItineraryPlanning();
      case 'final-itinerary':
        return renderFinalItinerary();
      case 'trip-details':
        return renderTripDetails();
      case 'map-view':
        return renderMapView();
      case 'weather':
        return renderWeather();
      case 'settings':
        return renderSettings();
      default:
        return renderOnboarding();
    }
  };

  // ... existing code ...
};

export default TripSmartMockup; 