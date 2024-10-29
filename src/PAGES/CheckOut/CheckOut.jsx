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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="my-20 px-8 max-sm:my-16 max-sm:px-4">
        {/* Page title */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800 max-sm:text-xl">
          Billing details
        </h1>

        {/* Payment method selection form */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm max-sm:p-4">
            <Label className="text-lg font-semibold text-gray-800 mb-4 block max-sm:text-base">
              Select your payment method
            </Label>

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
              className="space-y-4"
            >
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors max-sm:p-3">
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

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors max-sm:p-3">
                <RadioGroupItem value="direct" />
                <Label
                  className={!isUserSignedIn || isCartEmpty ? "opacity-50" : ""}
                >
                  Direct Payment
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Details Section */}
          <div className="flex flex-col lg:flex-row gap-8 max-sm:gap-4">
            {checkOut === "installment" && (
              <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm max-sm:p-4">
                <h3 className="text-xl font-semibold mb-6 text-gray-800 max-sm:text-lg">
                  Installment Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-700 mb-2 block">
                      Number of months
                    </Label>
                    <Select
                      id="months"
                      onValueChange={(value) => {
                        setMonths(Number(value));
                        setIsFormValid(!!value && !!paymentDay);
                      }}
                    >
                      <SelectTrigger className="w-full p-3 rounded-xl border-gray-200">
                        <SelectValue placeholder="Select months" />
                      </SelectTrigger>
                      <SelectContent>
                        {[2, 4, 6, 9, 12].map((item) => (
                          <SelectItem key={item} value={item.toString()}>
                            {item} month{item > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-700 mb-2 block">
                      Payment Day
                    </Label>
                    <Select
                      id="paymentDay"
                      onValueChange={(value) => {
                        setPaymentDay(Number(value));
                        setIsFormValid(!!value && !!months);
                      }}
                    >
                      <SelectTrigger className="w-full p-3 rounded-xl border-gray-200">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 28 }, (_, i) => i + 1).map(
                          (day) => (
                            <SelectItem key={day} value={day.toString()}>
                              Day {day}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {isFormvalid && (
                    <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
                      <p className="text-sm text-purple-800 font-medium">
                        ₦ {monthlyPayment.toFixed(2)} will be deducted monthly
                        on day {paymentDay} for {months} months
                      </p>
                    </div>
                  )}

                  <div className="mt-6">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={isPaymentConfirmed}
                        onCheckedChange={handlePackageConfirmation}
                        disabled={!months || !paymentDay}
                        className="rounded-md"
                      />
                      <Label
                        className={
                          !months || !paymentDay
                            ? "opacity-50"
                            : "text-sm text-gray-600"
                        }
                      >
                        I confirm the installment package details
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {checkOut === "direct" && (
              <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm max-sm:p-4">
                <h3 className="text-xl font-semibold mb-6 text-gray-800 max-sm:text-lg">
                  Billing Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-700 mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      placeholder="Enter your full name"
                      id="fullname"
                      required
                      className="w-full p-3 rounded-xl border-gray-200 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 mb-2 block">
                      Email address
                    </Label>
                    <Input
                      placeholder="your@email.com"
                      id="email"
                      type="email"
                      required
                      className="w-full p-3 rounded-xl border-gray-200 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 mb-2 block">
                      Shipping Address
                    </Label>
                    <Input
                      placeholder="Enter your shipping address"
                      id="address"
                      required
                      className="w-full p-3 rounded-xl border-gray-200 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Order Summary Section */}
            {checkOut && (
              <div className="lg:w-1/3 bg-white p-6 rounded-2xl shadow-sm max-sm:p-4">
                <h3 className="text-xl font-semibold mb-6 text-gray-800 max-sm:text-lg">
                  Order Summary
                </h3>

                <div className="space-y-4">
                  {cartState.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 py-3 border-b"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 max-sm:text-sm">
                          {item.name}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-semibold text-purple-600">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₦{cartState.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-3 border-t">
                      <span>Total</span>
                      <span className="text-purple-600">
                        ₦{cartState.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Place Order Button */}
        <button
          onClick={handleSubmit}
          className="bg-purple-700 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600 w-fit"
        >
          Place Order
        </button>
      </div>

      {/* Alert Dialog and Bank Card Modal styling updates */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className=" rounded-2xl max-sm:my-10">
          <AlertDialogHeader>
            <AlertDialogTitle className="max-sm:text-sm">
              Delivery Details Required
            </AlertDialogTitle>
            <AlertDialogDescription className="max-sm:text-xs">
              Please note that delivery details will be required after your
              first payment is processed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Understood</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showBankCardModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-8 max-sm:p-4 ">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-auto max-sm:rounded-2xl max-sm:p-6 max-sm:my-10">
            <div className="flex justify-between items-center mb-6 max-sm:mb-4">
              <h2 className="text-2xl font-bold text-gray-800 max-sm:text-sm">
                Add Payment Method
              </h2>
              <button
                onClick={() => setShowBankCardModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <TbEyeClosed className="w-6 h-6 max-sm:w-5 max-sm:h-5" />
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
