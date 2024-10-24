import { useContext, useState } from "react";
import { TbEyeClosed } from "react-icons/tb";
// Import the Input component for form inputs
import { Input } from "@/components/ui/input";
// Import various AlertDialog components for displaying alerts
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Import Navbar component for the navigation bar
import Navbar from "../../components/Navbar/Navbar";
// Import Checkbox component for user confirmations
import { Checkbox } from "@/components/ui/checkbox";
// Import Label component for form labels
import { Label } from "@/components/ui/label";
// Import useToast hook for displaying toast notifications
import { toast } from "react-toastify";
// Import Select components for dropdown menus
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Import RadioGroup components for selecting payment methods
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// Import CartContext to access cart state
import { CartContext } from "../../components/CartProvider";
import BankCard from "../../components/BankCard/BankCard";

const CheckOut = () => {
  // Destructure toast function from useToast hook

  // State to control the visibility of the alert dialog
  const [showAlert, setShowAlert] = useState(false);
  // Access cartState from CartContext
  const { cartState } = useContext(CartContext);
  // State to store the selected checkout method ('installment' or 'direct')
  const [checkOut, setCheckOut] = useState(null);
  // State to track if the form is valid
  const [isFormvalid, setIsFormValid] = useState(false);
  // State to store the number of months for installment payments
  const [months, setMonths] = useState(null);
  // State to store the payment day of the month for installments
  const [paymentDay, setPaymentDay] = useState(null);
  // State to track if the payment has been confirmed by the user
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [showBankCardModal, setShowBankCardModal] = useState(false);

  const isUserSignedIn = cartState.userEmail !== null;
  const isCartEmpty = cartState.total === 0;

  // Function to handle confirmation of the payment package
  const handlePackageConfirmation = (checked) => {
    // If the form is not valid, show a destructive toast notification

    // Update the payment confirmation state
    setIsPaymentConfirmed(checked);

    // If confirmed, show the alert dialog
    if (checked) {
      setShowAlert(true);
    }
  };

  // Calculate the total price from the cart items
  const total = cartState.items.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  // Calculate the monthly payment based on selected months
  const monthlyPayment = months ? total / months : 0;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkOut === "installment") {
      if (!isFormvalid) {
        toast.error(
          "Please fill out all required fields before placing the order."
        );
        return;
      }

      if (!isPaymentConfirmed) {
        toast.error(
          "Please confirm the installment package details before placing the order."
        );
        return;
      }

      // Show BankCard modal for installment payment
      setShowBankCardModal(true);
    } else if (checkOut === "direct") {
      const requiredFields = ["fullname", "email", "address"];
      const missingFields = requiredFields.filter(
        (field) => !document.getElementById(field).value
      );

      if (missingFields.length > 0) {
        toast.error(
          "Please fill out all required fields before placing the order."
        );
        return;
      }

      // Show BankCard modal for direct payment
      setShowBankCardModal(true);
    } else {
      toast.error("Please select a payment method before placing the order.");
    }
  };

  const handleBankCardSuccess = () => {
    setShowBankCardModal(false);
    if (checkOut === "installment") {
      toast.success("Order placed successfully with installment plan!");
    } else {
      toast.success("Order placed successfully with direct payment!");
    }
    // Add any additional logic for successful order placement here
  };

  return (
    <div className="flex flex-col">
      {/* Render the navigation bar */}

      <Navbar />
      <div className="my-32 px-20">
        {/* Page title */}
        <h1 className="text-2xl font-semibold mb-4">Billing details</h1>
        {/* Payment method selection form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-4 flex flex-col gap-4"
        >
          {/* Label for the payment method selection */}
          <Label className="mb-4">Select your chilled payment method</Label>

          <RadioGroup
            disabled={!isUserSignedIn || isCartEmpty}
            onValueChange={(value) => {
              setCheckOut(value);
              if (value === "direct") {
                setMonths(null);
                setPaymentDay(null);
                setIsFormValid(false);
                setIsPaymentConfirmed(false);
              }
            }}
          >
            {/* Installment payment option */}
            <div className="insta flex gap-4 items-center">
              <RadioGroupItem
                value="installment"
                disabled={!isUserSignedIn || isCartEmpty}
              />
              <Label
                className={!isUserSignedIn || isCartEmpty ? "opacity-50" : ""}
              >
                Installment payment
              </Label>
            </div>
            {/* Direct payment option */}
            <div className="direct flex gap-4 items-center">
              <RadioGroupItem
                value="direct"
                disabled={!isUserSignedIn || isCartEmpty}
              />
              <Label
                className={!isUserSignedIn || isCartEmpty ? "opacity-50" : ""}
              >
                Direct Payment
              </Label>
            </div>
          </RadioGroup>
        </form>

        {!isUserSignedIn && (
          <p className="text-red-500 mt-2">
            Please sign in to proceed with checkout.
          </p>
        )}

        {isCartEmpty && (
          <p className="text-red-500 mt-2">
            Your cart is empty. Please add items to your cart before proceeding
            to checkout.
          </p>
        )}

        <div className="details flex justify-between items-center m-10 gap-4">
          {/* Render installment payment details if 'installment' is selected */}
          {checkOut === "installment" && (
            <>
              <div className="package_summary w-[50%]">
                {/* Heading for installment payment section */}
                <h3 className="text-lg font-semibold mb-4">
                  Installment payment
                </h3>
                {/* Selection of number of months for installments */}
                <div className="flex flex-col gap-2 mb-4">
                  <Label htmlFor="months">Number of months</Label>
                  <Select
                    id="months"
                    onValueChange={(value) => {
                      setMonths(Number(value));
                      // Validate form when months are selected
                      setIsFormValid(!!value && !!paymentDay);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Options for number of months */}
                      {[2, 4, 6, 9, 12].map((item) => (
                        <SelectItem key={item} value={item.toString()}>
                          {item} month{item > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Selection of payment day of the month */}
                <div className="flex flex-col gap-2">
                  <Label>Payment Day of Month</Label>
                  <Select
                    id="paymentDay"
                    onValueChange={(value) => {
                      setPaymentDay(Number(value));
                      // Validate form when payment day is selected
                      setIsFormValid(!!value && !!months);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Options for days 1 through 28 */}
                      {Array.from({ length: 28 }, (_, i) => i + 1).map(
                        (day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                {/* Display payment summary if the form is valid */}
                {isFormvalid && (
                  <div className="confirm m-8 p-4 bg-blue-100 rounded-md">
                    <p className="text-sm font-semibold">
                      ₦ {monthlyPayment.toFixed(2)} will be deducted from your
                      bank on day {paymentDay} of each month for the next{" "}
                      {months} month{months && months > 1 ? "s" : ""}.
                    </p>
                  </div>
                )}
                {/* Checkbox for confirming installment package details */}
                <div className="confirm flex gap-4 items-center mt-8">
                  <Checkbox
                    checked={isPaymentConfirmed}
                    onCheckedChange={handlePackageConfirmation}
                    disabled={!months || !paymentDay}
                  />
                  <Label
                    htmlFor="confirmPackage"
                    className={!months || !paymentDay ? "opacity-50" : ""}
                  >
                    I confirm the installment package details
                  </Label>
                </div>
              </div>
            </>
          )}

          {/* Render the direct payment form when 'direct' payment method is selected */}
          {checkOut === "direct" && (
            <div className="direct flex flex-col gap-4 w-[50%]">
              {/* Heading for the billing information section */}
              <h3 className="text-lg font-semibold mb-4">
                Billing Information
              </h3>
              {/* Full Name input field */}
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input placeholder="xammie" id="fullname" required />
              </div>
              {/* Email address input field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input placeholder="xammie@gmail.com" id="email" required />
              </div>
              {/* Shipping Address input field */}
              <div className="space-y-2">
                <Label htmlFor="address">Shipping Address</Label>
                <Input
                  placeholder="1234 Main St, Anytown, USA"
                  id="address"
                  required
                />
              </div>
            </div>
          )}

          {/* Render product summary if a checkout method is selected */}
          {checkOut && (
            <div className="prod_summary">
              <div className="grid grid-rows-3 gap-4">
                {/* Iterate over cart items and display each product */}
                {cartState.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-center justify-between"
                  >
                    {/* Product image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover"
                    />
                    {/* Product name */}
                    <p className="text-xs">{item.name}</p>
                    {/* Product total price */}
                    <p className="text-xs font-semibold">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              {/* Display subtotal and shipping information */}
              <div className="mt-4 flex justify-between flex-col text-right">
                <p className="text-lg font-bold">
                  Subtotal: ₦{cartState.total.toLocaleString()}
                </p>
                <p className="text-lg font-bold">Shipping: Free</p>
              </div>
            </div>
          )}
        </div>

        {/* Button to place the order */}
        <button
          className="bg-red-500 hover:bg-green-600 mt-8 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 w-full max-sm:py-1 max-sm:px-2 max-sm:items-center"
          onClick={handleSubmit}
        >
          Place Order
        </button>
      </div>
      {/* Alert dialog for delivery details notification */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delivery Details Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please note that delivery details will be required after your
              first payment is processed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Understood</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* BankCard Modal */}
      {showBankCardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-auto my-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add Payment Method</h2>
              <button
                onClick={() => setShowBankCardModal(false)}
                className="text-gray-500 hover:text-gray-700 "
              >
                <TbEyeClosed style={{ fontSize: "2rem", color: "black" }} />
              </button>
            </div>
            <BankCard onSuccess={handleBankCardSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
