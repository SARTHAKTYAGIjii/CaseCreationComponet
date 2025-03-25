import { LightningElement, track} from "lwc";
import createCase from "@salesforce/apex/CaseWithDetails.createCase";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import createCase1 from "@salesforce/apex/CaseWithDetails.createCase1";

export default class CaseWithDetails extends LightningElement {
    @track selectedCountry;
    customerName;
    cityName;
    PhoneNum;
    street;
    caseData;
    PostCode;
    @track textAreaContent;
    @track emailVal;
    @track numberOfProduct;
    @track ReasonForReturn;
    @track ProductName;
    @track selectedRequestType;
    files;
    @track isButtonDisabled = true;
    showImageName;
    countryOptions = [
        { label: "United Kingdom", value: "UK" },
        { label: "India", value: "India" },
        { label: "United States of America", value: "USA" }
    ];
    Products = [{ label: "1", value: "1" }];
    ReasonReturn = [
        { label: "Faulty/Defective Product", value: "Faulty" },
        { label: "Product Damaged", value: "ProductDamaged" },
        { label: "Incorrect Item Sent", value: "IncorrectItemSent" },
        { label: "Change of mind", value: "Changeofmind" }
    ];
    ProductOption = [];
    requestTypeOptions = [];

    async handleemail(event) {
        console.log('inside the handleEmail method')
        this.emailVal = event.target.value;
        console.log(this.emailVal);
        if (this.isEmailValid(this.emailVal)) {
            await createCase({ Eml: this.emailVal })
                .then((result) => {
                    if (result.length > 0) {
                        console.log(result);
                        this.ProductOption = result.map((ele) => ({
                            label: ele.Name,
                            value: ele.Id
                        }));
                    }
                })
                .catch(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Failed",
                            message: "No data found write the correct email",
                            variant: "error"
                        })
                    );
                });
        }
    }

    isEmailValid(email) {
        const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        return emailRegex.test(email);
    }
    handleAllOnClickFunction(event) {
        const fieldName = event.target.name;
        const value = event.target.value || event.detail.value;

        switch (fieldName) {
            case "PhoneNumber":
                this.PhoneNum = value;
                break;
            case "customerName":
                this.customerName = value;
                console.log(this.customerName);
                break;
            case "Postcode":
                this.PostCode = value;
                break;
            case "street":
                this.street = value;
                break;
            case "cityName":
                this.cityName = value;
                break;
            case "selectedCountry":
                this.selectedCountry = value;
                break;
            case "numberOfProduct":
                this.numberOfProduct = value;
                console.log("this is the numberofProduct", this.numberOfProduct);
                break;
            case "ProductName":
                this.ProductName = value;
                break;
            default:
                console.log("here");
                break;
        }
    }

    handleKeyup(event) {
        const keyPressed = event.key;
        if (!/[a-zA-Z]/.test(keyPressed)) {
            const msg = this.template.querySelector(".showmsg");
            msg.textContent = "Invalid Character,In Name Only use alphabets";
            setTimeout(() => {
                msg.textContent = "";
            }, 3000);
        }
    }

    handleReason(event) {
        this.ReasonForReturn = event.detail.value;
        if (
            this.ReasonForReturn === "Faulty" ||
            this.ReasonForReturn === "ProductDamaged"
        ) {
            this.selectedRequestType = "Refund";
            this.requestTypeOptions = [{ label: "Refund", value: "Refund" }];
        } else if (
            this.ReasonForReturn === "IncorrectItemSent" ||
            this.ReasonForReturn === "Changeofmind"
        ) {
            this.selectedRequestType = "Return";
            this.requestTypeOptions = [{ label: "Return", value: "Return" }];
        }
    }
    handleUploadFinished(event) {
        this.files = event.detail.files[0].documentId;
        this.showImageName = this.template.querySelector(".showImageName");
        this.showImageName.textContent = event.detail.files[0].name;
    }
    deleteUploadedImage() {
        this.showImageName = this.template.querySelector(".showImageName");
        this.showImageName.textContent = "";
        this.files = null;
    }
    handleSave() {
        this.caseData = {
            contentDocumentId: this.files,
            productId: this.ProductName,
            handlingReason: this.ReasonForReturn,
            cntofProduct: this.numberOfProduct,
            contactCountry: this.selectedCountry,
            contactCity: this.cityName,
            contactStreet: this.street,
            contactPostalCode: this.PostCode,
            customerName: this.customerName,
            contactPhone: this.PhoneNum,
            contactEmail: this.emailVal
        };
        console.log('here is the caseData for the js file',JSON.stringify(this.caseData));
        if (!this.PhoneNum ||!this.PostCode || !this.ProductName || !this.customerName || !this.street || !this.files || !this.ReasonForReturn || !this.selectedCountry ||!this.cityName ||!this.emailVal ||!this.numberOfProduct || !this.selectedRequestType){
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "failed",
                    message: "one of the field is empty",
                    variant: "error"
                })
            );
        }
        else{
           createCase1({ caseData1: this.caseData });
        this.dispatchEvent(
            new ShowToastEvent({
                title: "success",
                message: "Record is Created",
                variant: "success"
            })
        );
        this.PhoneNum = "";
        this.PostCode = "";
        this.ProductName = "";
        this.customerName = "";
        this.street = "";
        this.files = "";
        this.ReasonForReturn = "";
        this.selectedCountry = "";
        this.cityName = "";
        this.emailVal = "";
        this.numberOfProduct = "";
        this.selectedRequestType = "";
        this.showImageName = this.template.querySelector(".showImageName");
        this.showImageName.textContent = "";
        this.files = null;
        this.textAreaContent = "";
        }
    }
}
