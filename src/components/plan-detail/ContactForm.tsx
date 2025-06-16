
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

// Form validation schema
const bookingFormSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
  phone: z.string()
    .optional()
    .refine(val => !val || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(val), {
      message: "Please enter a valid phone number",
    }),
  travelers: z.string()
    .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0 && parseInt(val, 10) <= 50, {
      message: "Please enter a valid number of travelers (1-50)",
    }),
  date: z.string()
    .refine((val) => val.length > 0, {
      message: "Please select a travel date",
    }),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const ContactForm = ({ plan }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      travelers: "2",
      date: "",
      message: "",
    },
  });

  const sendEmailNotification = async (formData: BookingFormValues) => {
    try {
      // Create email content
      const emailContent = `
        New Booking Request for ${plan.title}
        
        Customer Details:
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone || 'Not provided'}
        Number of Travelers: ${formData.travelers}
        Preferred Date: ${formData.date}
        
        Message:
        ${formData.message}
        
        Plan Details:
        Tour: ${plan.title}
        Duration: ${plan.duration}
        Price: ${plan.price}
      `;

      // For now, we'll log this. In a real implementation, you'd use an email service
      console.log("Email would be sent to: bilalmohd3160@gmail.com");
      console.log("Email content:", emailContent);
      
      // You would typically use a service like EmailJS, Supabase, or a backend API here
      // For demonstration, we'll simulate the email send
      return Promise.resolve();
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  const onSubmit = async (values: BookingFormValues) => {
    setLoading(true);
    
    try {
      console.log("Form values:", values, "Plan:", plan.title);
      
      // Send email notification
      await sendEmailNotification(values);
      
      // Simulate form processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      toast({
        title: "Booking Request Sent",
        description: `Thank you for booking the ${plan.title} tour. We'll be in touch shortly!`,
      });
      
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-ivory-50 rounded-xl shadow-lg border border-ivory-300 p-8 text-center max-w-4xl mx-auto"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-16 w-16 text-maroon-600 mb-4"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M7 13l3 3 7-7" />
          </svg>
          <h3 className="text-2xl font-display font-medium mb-3 text-royal-800">Thank You!</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Your booking request has been successfully sent. We appreciate your interest and will get back to you as soon as possible.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="font-medium">
            Send Another Request
          </Button>
        </div>
      </motion.div>
    );
  }

  // Special styling for VIP Luxury tour
  const isLuxuryTour = plan.id === 26;

  return (
    <div className={`py-12 ${isLuxuryTour ? 'bg-gradient-to-b from-amber-50 to-ivory-50' : 'bg-ivory-50/50'} backdrop-blur-sm`}>
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className={`text-3xl md:text-4xl font-display font-semibold mb-3 ${isLuxuryTour ? 'text-amber-900' : 'text-royal-800'}`}>
            {isLuxuryTour ? 'Request VIP Consultation' : 'Book This Tour'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isLuxuryTour 
              ? 'Connect with our luxury travel specialists to design your bespoke experience. All inquiries receive priority attention within 2 hours.'
              : 'Fill in the form below to inquire about this tour. Our team will get back to you within 24 hours.'
            }
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 ${isLuxuryTour ? 'bg-white/90 backdrop-blur border-amber-200' : 'bg-white border-ivory-200'} rounded-xl p-6 md:p-8 shadow-lg border`}>
              {isLuxuryTour && (
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg mb-6">
                  <p className="text-amber-800 text-sm font-medium text-center">
                    🥇 VIP Priority Service - Dedicated luxury travel consultant assigned
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-royal-800">Full Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          className={`w-full px-4 py-3 rounded-md border border-input bg-white focus:outline-none focus:ring-2 ${isLuxuryTour ? 'focus:ring-amber-500' : 'focus:ring-maroon-600'} focus:border-transparent transition-colors`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-royal-800">Email Address *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your.email@example.com"
                          type="email"
                          {...field}
                          className={`w-full px-4 py-3 rounded-md border border-input bg-white focus:outline-none focus:ring-2 ${isLuxuryTour ? 'focus:ring-amber-500' : 'focus:ring-maroon-600'} focus:border-transparent transition-colors`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-royal-800">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your phone number (optional)"
                          type="tel"
                          {...field}
                          className={`w-full px-4 py-3 rounded-md border border-input bg-white focus:outline-none focus:ring-2 ${isLuxuryTour ? 'focus:ring-amber-500' : 'focus:ring-maroon-600'} focus:border-transparent transition-colors`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-royal-800">Number of Travelers *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className={`w-full px-4 py-3 rounded-md border border-input bg-white focus:outline-none focus:ring-2 ${isLuxuryTour ? 'focus:ring-amber-500' : 'focus:ring-maroon-600'} focus:border-transparent transition-colors`}>
                            <SelectValue placeholder="Select number of travelers" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                              <SelectItem key={num} value={String(num)} className="cursor-pointer hover:bg-ivory-100">
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-royal-800">Preferred Travel Date *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className={`w-full px-4 py-3 rounded-md border border-input bg-white focus:outline-none focus:ring-2 ${isLuxuryTour ? 'focus:ring-amber-500' : 'focus:ring-maroon-600'} focus:border-transparent transition-colors`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-royal-800">
                      {isLuxuryTour ? 'Your Vision & Preferences *' : 'Your Message *'}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={isLuxuryTour 
                          ? "Describe your dream experience, preferred destinations, accommodation style, special occasions, dietary requirements, and any other preferences..."
                          : "Please share any specific requirements or preferences for your trip..."
                        }
                        rows={6}
                        {...field}
                        className={`w-full px-4 py-3 rounded-md border border-input bg-white focus:outline-none focus:ring-2 ${isLuxuryTour ? 'focus:ring-amber-500' : 'focus:ring-maroon-600'} focus:border-transparent transition-colors resize-none`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className={`w-full md:w-auto px-8 py-3 ${isLuxuryTour ? 'bg-amber-600 hover:bg-amber-700' : 'bg-maroon-600 hover:bg-maroon-700'} text-white font-medium rounded-md transition-colors disabled:opacity-70`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      {isLuxuryTour ? 'Request VIP Consultation' : 'Send Request'}
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
