public with sharing class CaseWithDetails {
    @AuraEnabled
   public static list<Product2> createCase(String Eml){
    Contact con=[SELECT ID,AccountID ,Email FROM Contact WHERE Email=:Eml limit 1];
    System.debug(Eml);
    Id acId=con.AccountID;
    list<Opportunity> opp=[SELECT ID FROM Opportunity WHERE AccountID=:acId];
    Set<ID>oppId=new Set<ID>();
    for(Opportunity opp1:opp){
        oppId.add(opp1.ID);
    }
    list<OpportunityLineItem>oli=[SELECT ID,Product2Id,OpportunityId FROM OpportunityLineItem WHERE OpportunityId=:oppId];
    set<Id>productId=new set<Id>();
    for(OpportunityLineItem oppItem:oli){
        productId.add(oppItem.Product2Id);
    }
    list<Product2>pdt=[SELECT Id,Name FROM Product2 WHERE Id=:productId];
    system.debug(pdt);
    return pdt;
   }
   @AuraEnabled
   public static void createCase1(CaseDataWrapper caseData1) {
    system.debug('this is the wrapper class'+caseData1);
       String contentDocumentId = caseData1.contentDocumentId;
       String productId = caseData1.productId;
       String handlingReason = caseData1.handlingReason;
       Integer cntofProduct = Integer.valueOf(caseData1.cntofProduct);
       String contactCountry = caseData1.contactCountry;
       String contactCity = caseData1.contactCity;
       String contactStreet = caseData1.contactStreet;
       Integer contactPostalCode = caseData1.contactPostalCode;
       String customerName = caseData1.customerName;
       String contactPhone = caseData1.contactPhone;
       String contactEmail = caseData1.contactEmail;
       List<Contact> contactList = [SELECT Id, AccountId FROM Contact WHERE Email = :contactEmail LIMIT 1];
       if (contactList.isEmpty()) {
           throw new AuraHandledException('Contact with the provided email not found.');
       }
       for (Contact con : contactList) {
           con.MailingCountry = contactCountry;
           con.MailingCity = contactCity;
           con.MailingStreet = contactStreet;
           con.MailingPostalCode = String.valueOf(contactPostalCode);
           con.Phone = contactPhone;
       }
       update contactList;
       Product2 pt = [SELECT Id, Name FROM Product2 WHERE Id = :productId LIMIT 1];
       if (pt == null) {
           throw new AuraHandledException('Product with the provided ID not found.');
       }
       Case newCase = new Case(
           ContactId = contactList[0].Id,
           AccountId = contactList[0].AccountId,
           CountOfProduct__c = cntofProduct,
           reasonForReturn__c = handlingReason,
           Origin = 'Email',
           Status = 'New'
       );
       insert newCase;
       ContentDocumentLink cdl = new ContentDocumentLink(
           ContentDocumentId = contentDocumentId,
           LinkedEntityId = newCase.Id,
           ShareType = 'V',
           Visibility = 'AllUsers'
       );
       insert cdl;
   }
  
   public class CaseDataWrapper {
       @AuraEnabled public String contentDocumentId;
       @AuraEnabled public String productId;
       @AuraEnabled public String handlingReason;
       @AuraEnabled public String cntofProduct;
       @AuraEnabled public String contactCountry;
       @AuraEnabled public String contactCity;
       @AuraEnabled public String contactStreet;
       @AuraEnabled public Integer contactPostalCode;
       @AuraEnabled public String customerName;
       @AuraEnabled public String contactPhone;
       @AuraEnabled public String contactEmail;
   }
}
