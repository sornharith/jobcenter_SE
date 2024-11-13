"use client";

import React, { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from "@/components/ui/input_ui";
import { Label } from "@/components/ui/label";
import Button from "@/components/ui/Button";
import { Check, XCircle } from 'lucide-react';

const ApplyButton = () => {
    const [showForm, setShowForm] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      file: null as File | null
    });
  
    const handleApplyClick = () => {
      setShowForm(true);
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validate form
      if (formData.name.trim() === '' || !formData.file) {
        setIsSuccess(false);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
        return;
      }
  
      // If validation passes
      setIsSuccess(true);
      setShowNotification(true);
      setShowForm(false);
      setTimeout(() => setShowNotification(false), 2000);
    };
  
    return (
      <div>
        <Button onClick={handleApplyClick}>Apply Now</Button>
        
        {/* Application Form Dialog */}
        <AlertDialog open={showForm} onOpenChange={setShowForm}>
          <AlertDialogContent className="sm:max-w-[425px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Submit Application</AlertDialogTitle>
            </AlertDialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="resume">Resume</Label>
                <Input
                  id="resume"
                  type="file"
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    file: e.target.files?.[0] || null
                  }))}
                  className="cursor-pointer"
                />
              </div>
  
              <div className="flex justify-end">
                <Button type="submit">Submit Application</Button>
              </div>
            </form>
          </AlertDialogContent>
        </AlertDialog>
  
        {/* Centered Success/Error Notification */}
        <AlertDialog open={showNotification}>
          <AlertDialogContent className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 p-4 rounded-lg shadow-lg ${
            isSuccess ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <div className="flex items-center gap-3">
              {isSuccess ? (
                <>
                  <Check className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-green-600">Success</h4>
                    <p className="text-green-600">Application submitted successfully!</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-red-600" />
                  <div>
                    <h4 className="font-semibold text-red-600">Error</h4>
                    <p className="text-red-600">Please fill in all required fields!</p>
                  </div>
                </>
              )}
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };
  
  export default ApplyButton;