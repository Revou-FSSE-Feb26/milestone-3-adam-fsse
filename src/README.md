# RevoShop (Module 4 Assignment)

## Overview
RevoShop is a Next.js project for RevoU assignment. This project will help me understanding next.js and its components within.

## Features
1. Home page / Landing page. Is just a simple welcome message for now.
2. Store page. Is a page that will fetch data from API (a fake simulation one), and display its contents as a products card. Each card can be clicked to go to dynamic folder based on the data ID, and will shows the detailed info of the product. It have a button to add the product into cart.
3. Cart page. It will shows the product that have been added to cart. There is button to clear the cart.

## Technology Used
1. Here is the directory structure:
```
@app
|--(pages)
|   |--cart
|   |   Lpages.jsx
|   L--store
|       |--[id]
|       |    Lpages.jsx
|       L--pages.jsx
|--Components
|   |--AddToCartButton.jsx
|   |--CartContex.jsx
|   |--EmptyCartButton.jsx
|   |--Footer.jsx
|   L--Header.jsx
L--pages.jsx
```

2. Here is the Layout.js
```
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CartProvider>
          <Header title="RevoShop" />
          <main>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
```
* In this Layout I'm using the wrapper *<CartProvider* to better manage the data of the cart within the page.
* In the header I prop the title data to the Header components.

3. Components. There is 5 Components here, 2 is for Header and Footer, and 2 for button function, and 1 is for managing data within the pages.

4. Header and Footer:
    * Header is used to keep the navigation bar within the pages. There is link to open Home, Store, and Cart pages.
    * Footer is to store info of the Site.

5. AddToCartButton.jsx and EmptyCartButton.jsx
    * The add to cart button it for adding the product into the cart array.
    * The empty cart button is to clear the product from cart (or cart array and local storage).

6. CartContex.jsx
    * This is act as a provider used for managing the data (cart) within pages. It utilize the *createContext* and *useContext* to communicate the date within the pages.
    * It keeps the Header updated and will utilize the virtual DOM to update the total item inside Cart.
    * It utilize *useEffect* to manage the data in local storage.
    * It provides the logic for add item and for clear the cart.

7. Store/page.jsx and Store/**[id]**/page.jsx
    * This page will fetch the API data and shows the product on each own card.
    * The card also act as a Dynamic Routes that will route the page into the product detailed page, based on each ID clicked in the Store page.
    * The detailed page shows the information of the specific ID.

8. Cart/page.jsx
    * This will pull the cart data from CartContex, and display it with cart.map iteration.
    * There is also a clear cart button



## How To Access
You can access the website from this Live URL:
-- pending --

You can access the repositories from here:
  https://github.com/Revou-FSSE-Feb26/milestone-3-adam-fsse
 

-end of file-

