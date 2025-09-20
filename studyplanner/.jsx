import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen, Target, Plus, Check } from 'lucide-react';

const StudyPlanner = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: "Digital Forensics in Cybersecurity – D431", priority: true, estimatedWeeks: 0, estimatedDays: 0, completed: false },
    { id: 2, name: "Data Management - Foundations – D426", priority: false, estimatedWeeks: 0, estimatedDays: 0, completed: false },
    { id: 3, name: "Data Management - Applications – D427", priority: false, estimatedWeeks: 0, estimatedDays: 0, completed: false },
    { id: 4, name: "Information Systems Security – C845", priority: false, estimatedWeeks: 0, estimatedDays: 0, completed: false },
    { id: 5, name: "Introduction to Cryptography – D334", priority: true, estimatedWeeks: 0, estimatedDays: 0, completed: false },
    { id: 6, name: "Business of IT - Project Management – D324", priority: false, estimatedWeeks: 0, estimatedDays: 0, completed: false },
    { id: 7, name: "Linux Foundations – D281", priority: false, estimatedWeeks: 0, estimatedDays: 0, completed: false },
    { id: 8, name: "Introduction to Programming in Python – D335", priority: false, estimatedWeeks: 0, estimatedDays: 0, completed: false },
    { id: 9, name: "Managing Information Security – C843", priority: true, estimatedWeeks: 0, estimatedDays: 0, completed: false },
    { id: 10, name: "Cyber Defense and Countermeasures – D340", priority: false, estimatedWeeks: 0, estimatedDays: 0, completed: false },
    { id: 11, name: "Managing Cloud Security – D320", priority: false, estimatedWeeks: 0, estimatedDays: 0, completed: false },
    { id: 12, name: "Penetration Testing and Vulnerability Analysis – D332", priority: true, estimatedWeeks: 0, estimatedDays: 0, completed: false },
    { id: 13, name: "IT Capstone Written Project – C769", priority: false, estimatedWeeks: 0, estimatedDays: 0, completed: false }
  ]);

  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const updateEstimatedWeeks = (id, weeks) => {
    setClasses(prev => prev.map(cls => 
      cls.id === id ? { ...cls, estimatedWeeks: parseInt(weeks) || 0 } : cls
    ));
  };

  const updateEstimatedDays = (id, days) => {
    setClasses(prev => prev.map(cls => 
      cls.id === id ? { ...cls, estimatedDays: parseInt(days) || 0 } : cls
    ));
  };

  const toggleCompleted = (id) => {
    setClasses(prev => prev.map(cls => 
      cls.id === id ? { ...cls, completed: !cls.completed } : cls
    ));
  };

  const calculateTimeline = () => {
    let currentDate = new Date(startDate);
    const timeline = [];
    
    classes.filter(cls => !cls.completed && (cls.estimatedWeeks > 0 || cls.estimatedDays > 0)).forEach(cls => {
      const startDateForClass = new Date(currentDate);
      const totalDays = (cls.estimatedWeeks * 7) + cls.estimatedDays;
      currentDate.setDate(currentDate.getDate() + totalDays);
      const endDateForClass = new Date(currentDate);
      
      timeline.push({
        ...cls,
        startDate: startDateForClass,
        endDate: endDateForClass,
        totalDays
      });
    });
    
    return timeline;
  };

  const timeline = calculateTimeline();
  const totalDays = classes.reduce((sum, cls) => !cls.completed ? sum + (cls.estimatedWeeks * 7) + cls.estimatedDays : sum, 0);
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const completedClasses = classes.filter(cls => cls.completed).length;
  const remainingClasses = classes.length - completedClasses;

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-blue-600 w-8 h-8" />
          <h1 className="text-3xl font-bold text-gray-800">Academic Study Planner</h1>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Target className="text-blue-600 w-5 h-5" />
              <span className="text-blue-800 font-semibold">Total Classes</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{classes.length}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Check className="text-green-600 w-5 h-5" />
              <span className="text-green-800 font-semibold">Completed</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{completedClasses}</p>
          </div>
          <div className="bg-orange-100 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <BookOpen className="text-orange-600 w-5 h-5" />
              <span className="text-orange-800 font-semibold">Remaining</span>
            </div>
            <p className="text-2xl font-bold text-orange-900">{remainingClasses}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="text-purple-600 w-5 h-5" />
              <span className="text-purple-800 font-semibold">Est. Time</span>
            </div>
            <p className="text-lg font-bold text-purple-900">
              {totalWeeks}w {remainingDays}d
            </p>
          </div>
        </div>

        {/* Start Date Picker */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Study Start Date:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Classes List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Classes & Estimates
          </h2>
          
          <div className="space-y-3">
            {classes.map(cls => (
              <div key={cls.id} className={`border rounded-lg p-4 ${cls.priority ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} ${cls.completed ? 'opacity-60 bg-gray-50' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => toggleCompleted(cls.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          cls.completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {cls.completed && <Check className="w-3 h-3" />}
                      </button>
                      <h3 className={`font-medium ${cls.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {cls.name}
                      </h3>
                      {cls.priority && (
                        <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Priority
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <label className="text-sm text-gray-600">Estimated time:</label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="0"
                          max="52"
                          value={cls.estimatedWeeks}
                          onChange={(e) => updateEstimatedWeeks(cls.id, e.target.value)}
                          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          disabled={cls.completed}
                        />
                        <span className="text-sm text-gray-600">weeks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="0"
                          max="6"
                          value={cls.estimatedDays}
                          onChange={(e) => updateEstimatedDays(cls.id, e.target.value)}
                          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          disabled={cls.completed}
                        />
                        <span className="text-sm text-gray-600">days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Study Timeline
          </h2>
          
          {timeline.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>Add estimated weeks to see your timeline</p>
            </div>
          ) : (
            <div className="space-y-3">
              {timeline.map((item, index) => (
                <div key={item.id} className="border-l-4 border-blue-400 pl-4 py-2">
                  <h4 className="font-medium text-gray-800 mb-1">
                    {item.name}
                  </h4>
                  <div className="text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Start:</span> {formatDate(item.startDate)}
                    </p>
                    <p>
                      <span className="font-medium">End:</span> {formatDate(item.endDate)}
                    </p>
                    <p>
                      <span className="font-medium">Duration:</span> {item.estimatedWeeks > 0 && `${item.estimatedWeeks} week${item.estimatedWeeks !== 1 ? 's' : ''}`}{item.estimatedWeeks > 0 && item.estimatedDays > 0 && ', '}{item.estimatedDays > 0 && `${item.estimatedDays} day${item.estimatedDays !== 1 ? 's' : ''}`}
                    </p>
                  </div>
                </div>
              ))}
              
              {timeline.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Projected Completion</h3>
                  <p className="text-green-700">
                    All remaining classes: {formatDate(timeline[timeline.length - 1]?.endDate)}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    Total study time: {totalWeeks > 0 && `${totalWeeks} week${totalWeeks !== 1 ? 's' : ''}`}{totalWeeks > 0 && remainingDays > 0 && ', '}{remainingDays > 0 && `${remainingDays} day${remainingDays !== 1 ? 's' : ''}`} ({Math.round(totalDays / 30)} months)
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;
