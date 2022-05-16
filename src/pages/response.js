import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function PaymentResponse() {
  const search = useLocation().search;
  const transactionState = new URLSearchParams(search).get(
    "lapTransactionState"
  );
  const items = new URLSearchParams(search).get("description");
  const data = items.split(" | ");

  const totalValue = new URLSearchParams(search).get("TX_VALUE");

  const headers = ["Item", "Units", "Unit price", "Total per item"];

  console.log(items);

  const itemsBought = data[0]
    .replace("Items => [ ", "")
    .replace(" ]", "")
    .split(",");
  console.log(itemsBought);
  const amountSelected = data[1]
    .replace("Amount => [ ", "")
    .replace(" ]", "")
    .replace(/\s/g, "")
    .split(",");
  console.log(amountSelected);
  const unitPrice = data[2]
    .replace("Unit price => [ ", "")
    .replace(" ]", "")
    .replace(/\s/g, "")
    .split(",");

  const totalPerItem = data[3]
    .replace("Total per item => [ ", "")
    .replace(" ]", "")
    .replace(/\s/g, "")
    .split(",");

  const cartReport = itemsBought.map((_, index) => (
    <div className="flex justify-between">
      <p className="min-w-[320px]">{itemsBought[index]}</p>
      <p className="min-w-[80px] text-center">{amountSelected[index]}</p>
      <p className="min-w-[200px] text-right hidden lg:block">
        {parseInt(unitPrice[index]).toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          currencyDisplay: "code",
        })}
      </p>
      <p className="min-w-[200px] text-right hidden sm:block">
        {parseInt(totalPerItem[index]).toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          currencyDisplay: "code",
        })}
      </p>
    </div>
  ));

  const transactionReport =
    transactionState === "APPROVED" ? (
      <div className="flex flex-col max-w-md lg:max-w-4xl sm:max-w-2xl mx-auto h-[480px] justify-center">
        <h1 className="text-center title-projects2 font-bold">
          The transaction was successful
        </h1>
        <h1 className="mt-4 font-bold text-center text-2xl">Order Summary:</h1>
        <div className="mt-4 text-xl text-green-600 font-bold">
          <div className="flex justify-between mb-4">
            {headers.map((head, index) => (
              <p
                className={`${index === 0 && "min-w-[320px]"} ${
                  index === 3 && "min-w-[200px] text-right hidden sm:block"
                } ${
                  index === 2 && "min-w-[200px] text-right hidden lg:block"
                } ${index === 1 && "min-w-[80px] text-center"} title-projects3`}
              >
                {head}
              </p>
            ))}
          </div>
          {cartReport}
        </div>
        <div className="flex mt-4 justify-between font-bold text-2xl">
          <p className="">Total:</p>
          <p>
            {parseInt(totalValue.replace(".00", "")).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              currencyDisplay: "code",
            })}
          </p>
        </div>
        <Link
          to="/"
          className="mt-8 mb-8 px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-900 hover:shadow-lg hover:text-green-600 hover:scale-105 transition duration-150 ease-in-out w-fit mx-auto opacity-50 hover:opacity-90"
        >
          Go back to Home
        </Link>
      </div>
    ) : (
      <div className="flex mx-auto h-[480px] flex-col justify-center">
        <p className="text-center title-projects2 font-bold">
          The transaction has failed, Try again later
        </p>
      </div>
    );

  return <div className="mt-28">{transactionReport}</div>;
}

export default PaymentResponse;
