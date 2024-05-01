# CaseCreationComponet
so this is the redme file
<br>
so in this repo i will post my code of CaseCreaseComponent in this folder you will have all three files of the code like HTML,CSS,Js.
<br>
here is the list of functionality that i have build.
<br>
Create a LWC component as shown in the image.
<br>
Create City, Country, street, Postcode, request type, and reason for return fields on the case.
<br>
1. Customer Name - (Account Name)
<br>
2. City (Customer city)
<br>
3. Country (Picklist field (United Kingdom, India, United States of America))
<br>
4. Street (Customer street)
<br>
5. Postcode (Customer postcode)<br>
6. Order Email address (If it matches the Account email address then we will find related opportunity and Opportunity line items. If we get the Opportunity line items then we have to show Products in the Product input field.)<br>
7. Customer phone number<br>
8. Product to be returned (At a time only one product can be returned.)<br>
9. Reason for return (Picklist (Faulty/Defective Product, Product Damaged, Incorrect Item Sent, Change of mind))<br>
10. Product (Picklist - (Should be fetched from the Account's Opportunity's Opportunity Product))(If the Order email address matches the account's email)<br>
10. Request type (if Reason for return (Faulty/Defective Product, Product Damaged) is selected then it should be 'Refund' and if Reason for return (Incorrect Item Sent, Change of mind) is selected then it should be 'Return')<br>
11. Details of return or refund. (Enter description)<br>
12. Photo Upload (for uploading photo of product)<br>
13. Delete photo (for deleting the uploaded photo)<br>
14. Create Case. (When clicking on the case button a case should be created in the org with all the fields populated. (Account, Opportunity, and product auto-populated))<br>

All the fields should be mandatory. Without entering any field the Create case button should not be enabled.<br>

Notes:
- If the Order email address(6 point) is not found then shows an error email not found. Please enter a valid email.<br>
- Phone numbers should be 10 numbers.<br>
- Customer names only can be alphabets inputs.<br>
- The component should look good (Correct Padding should be done)
Create a community page Refund Request and deploy your component on that page.<br>
Also make sure, guest user also be able to submit the refund request via this page.<br>