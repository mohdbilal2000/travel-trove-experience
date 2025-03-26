
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PhoneCall, Mail, Calendar as CalendarIcon, CreditCard, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { TravelPlan } from "@/data/travelPlans";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { availablePaymentMethods, getPaymentMethodIcon, processPayment, PaymentMethod } from "@/lib/payment";

interface ContactFormProps {
  plan: TravelPlan;
}

// Form validation schema
const inquiryFormSchema = z.object({
  firstName: z.string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be less than 50 characters" }),
  lastName: z.string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
  phone: z.string()
    .optional()
    .refine(val => !val || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(val), {
      message: "Please enter a valid phone number",
    }),
  travelDate: z.date({
    required_error: "Please select a travel date",
  }),
  travelers: z.coerce.number()
    .min(1, { message: "At least 1 traveler is required" })
    .max(50, { message: "Please contact us directly for groups larger than 50" }),
  message: z.string()
    .optional(),
  paymentOption: z.enum(["full", "deposit"]),
  paymentMethod: z.enum(["credit_card", "paypal", "bank_transfer"]),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

const ContactForm = ({ plan }: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    bookingId: string;
    amount: number;
    transactionId?: string;
  } | null>(null);

  // Get today and min/max dates for travel date picker
  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() + 7); // Minimum 7 days in advance
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 2); // Maximum 2 years in advance

  // Calculate deposit amount (typically 25% of total cost)
  const basePrice = parseInt(plan.price.replace(/[^0-9]/g, ''));
  const depositAmount = Math.round(basePrice * 0.25);

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      travelDate: undefined,
      travelers: 2,
      message: "",
      paymentOption: "deposit",
      paymentMethod: "credit_card",
      terms: false,
    },
  });
  
  const paymentOption = form.watch("paymentOption");
  const paymentAmount = paymentOption === "full" ? basePrice : depositAmount;

  const handleSubmit = async (values: InquiryFormValues) => {
    setIsSubmitting(true);
    console.log("Form submitted with values:", values);
    
    try {
      // First submit booking details to our system
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate booking ID
      const bookingId = `BK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      // Process payment if selected
      setIsPaymentProcessing(true);
      
      const paymentResult = await processPayment({
        amount: paymentAmount,
        currency: "USD",
        description: `${paymentOption === "full" ? "Full payment" : "Deposit"} for ${plan.title}`,
        customerEmail: values.email,
        customerName: `${values.firstName} ${values.lastName}`,
        paymentMethod: values.paymentMethod as PaymentMethod,
      });
      
      if (!paymentResult.success) {
        throw new Error(paymentResult.error || "Payment processing failed");
      }
      
      // Set booking complete and save details
      setBookingComplete(true);
      setBookingDetails({
        bookingId,
        amount: paymentAmount,
        transactionId: paymentResult.transactionId,
      });
      
      toast({
        title: "Booking Successful!",
        description: `Your booking (${bookingId}) has been confirmed. Check your email for details.`,
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred during the booking process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsPaymentProcessing(false);
    }
  };

  if (bookingComplete && bookingDetails) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 bg-gray-50"
      >
        <div className="container max-w-4xl mx-auto px-4">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-800">Booking Confirmed!</CardTitle>
              <CardDescription className="text-green-700">
                Your {plan.title} tour has been successfully booked
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-medium mb-4 text-gray-800">Booking Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Booking Reference:</span>
                    <span className="font-medium">{bookingDetails.bookingId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Tour Package:</span>
                    <span className="font-medium">{plan.title}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Payment Amount:</span>
                    <span className="font-medium">${bookingDetails.amount} USD</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Payment Type:</span>
                    <span className="font-medium">{paymentOption === "full" ? "Full Payment" : "Deposit (25%)"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-medium">{bookingDetails.transactionId}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-medium mb-2 text-blue-800">What's Next?</h3>
                <p className="text-blue-700 mb-4">
                  We've sent a confirmation email with all details to your email address. One of our travel experts will contact you within 24 hours to discuss your trip details.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                      <Mail className="h-4 w-4 text-blue-700" />
                    </div>
                    <p className="text-sm text-blue-700">Check your email for a detailed confirmation</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                      <PhoneCall className="h-4 w-4 text-blue-700" />
                    </div>
                    <p className="text-sm text-blue-700">Expect a call from our travel expert within 24 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center mt-6">
                <Button asChild>
                  <a href="/">Return to Home</a>
                </Button>
                <Button variant="outline" onClick={() => setBookingComplete(false)}>
                  Make Another Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">
              Book Your {plan.title} Experience
            </h2>
            <p className="text-gray-700 mb-8">
              Ready to experience the wonders of the Golden Triangle? Complete the form to secure your spot on this incredible journey. Our team will quickly process your booking and reach out to confirm all details.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <PhoneCall className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Need Assistance?</h3>
                  <p className="text-gray-700">+91 98765 43210</p>
                  <p className="text-gray-600 text-sm">Our travel experts are ready to help</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Questions?</h3>
                  <p className="text-gray-700">bookings@guideindia.com</p>
                  <p className="text-gray-600 text-sm">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Booking Information</h3>
                  <p className="text-gray-700">Secure your spot with just 25% deposit</p>
                  <p className="text-gray-600 text-sm">Full refund available up to 30 days before departure</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Secure Payments</h3>
                  <p className="text-gray-700">Multiple payment options available</p>
                  <p className="text-gray-600 text-sm">All transactions are SSL encrypted</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-amber-800 font-medium mb-1">Important Note</h4>
                  <p className="text-sm text-amber-700">
                    Tour prices are per person based on double occupancy. Single room supplement fees may apply. Availability is subject to change until booked and confirmed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Booking Request</CardTitle>
                <CardDescription>
                  Complete the form below to book your {plan.title} tour
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input id="first-name" placeholder="John" required {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input id="last-name" placeholder="Doe" required {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="john.doe@example.com" 
                              required 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (optional)</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="+1 234 567 8900" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="travelDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Preferred Travel Date *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => 
                                  date < minDate || date > maxDate
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Select a date at least 7 days from today
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="travelers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Travelers *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              placeholder="2" 
                              required 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
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
                          <FormLabel>Special Requests or Questions</FormLabel>
                          <FormControl>
                            <Textarea 
                              id="message" 
                              placeholder="Tell us about any special requirements, preferences, or questions you may have." 
                              className="h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="payment-options">
                        <AccordionTrigger className="text-base font-medium">
                          Payment Options
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <FormField
                              control={form.control}
                              name="paymentOption"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel>Payment Amount *</FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex flex-col space-y-1"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="deposit" id="deposit" />
                                        <label htmlFor="deposit" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
                                          <span>25% Deposit (${depositAmount})</span>
                                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Recommended</span>
                                        </label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="full" id="full" />
                                        <label htmlFor="full" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                          Full Payment (${basePrice})
                                        </label>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="paymentMethod"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel>Payment Method *</FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex flex-col space-y-1"
                                    >
                                      {availablePaymentMethods.map((method) => (
                                        <div key={method.id} className="flex items-center space-x-2">
                                          <RadioGroupItem value={method.id} id={method.id} />
                                          <label htmlFor={method.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
                                            <span className="mr-2">{getPaymentMethodIcon(method.id as PaymentMethod)}</span>
                                            <span>{method.name}</span>
                                          </label>
                                        </div>
                                      ))}
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                          <FormControl>
                            <div className="mt-1">
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="h-4 w-4 text-primary border-gray-300 rounded"
                              />
                            </div>
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the <a href="#" className="text-primary hover:underline">terms and conditions</a> and <a href="#" className="text-primary hover:underline">privacy policy</a>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting || isPaymentProcessing}
                    >
                      {isSubmitting ? (
                        isPaymentProcessing ? "Processing Payment..." : "Sending..."
                      ) : (
                        `Book Now - $${paymentAmount}`
                      )}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      Your booking is secure and encrypted. No payment will be processed until confirmation.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
