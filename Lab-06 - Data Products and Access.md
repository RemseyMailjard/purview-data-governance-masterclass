![Banner](./assets/banner.png)

# Lab 6: Mastering Data Products & Data Access

## ProRail-context voor Data Stewards

**Praktijkkader (ProRail):** Data products ondersteunen ketens zoals planning, uitvoering, storingsanalyse en beleidsrapportage.

**Rolfocus Data Steward:**
- Definieer productgrenzen en minimale kwaliteitsvereisten.
- Ontwerp toegangsbeleid volgens least privilege en operationele noodzaak.
- Leg afhandelingstijden voor toegangsvragen vast.

**Op te leveren bewijs:**
- Data product canvas per prioritaire use-case.
- Standaard toegangsmatrix met rollen en goedkeuringsflow.

## Task 1: Creating Data Products

**⏰ Duration:** 20 minutes

**🎯 Outcome:** At the end of this task, you will have created one or more [Data products](https://learn.microsoft.com/purview/what-is-data-catalog#data-products) based on data assets curated in [Lab 5](/Lab-05%20-%20Curating%20Data%20Assets.md), and made them available to end users, via [access policies](https://learn.microsoft.com/purview/how-to-manage-data-catalog-access-policies).

### Data Products vs Data Assets

Individual Data assets by themselves have limited value. They typically need to be packaged together with relationships, and have context provided to be more useful. For example, a single fact table of 'Sales' likely requires 'Customers', 'Sales Representatives', and 'Regions' dimension tables to make the sales data more useful for analysis or reporting.

This is where Data products come in. Within Purview, a [Data product](https://learn.microsoft.com/purview/concept-data-products#whats-a-data-product) is a logical abstraction which represents a business concept with a name, description, owners, and most importantly a list of associated data assets. A successful Data product makes it easy for data consumers to recognize valuable data using their day-to-day language, and at the same time streamlines ownership responsibilities for those data assets.

Data products can be published for consumption by end users throughout the organization. They can be associated with [governance domain](https://learn.microsoft.com/purview/what-is-data-catalog#governance-domains), business [glossary terms](https://learn.microsoft.com/purview/what-is-data-catalog#glossary-terms), and objectives and key results ([OKRs](https://learn.microsoft.com/purview/what-is-data-catalog#okrs)) to provide context and alignment with business goals (more on this in the next lab).

Finally, Data products can be secured with [access policies](https://learn.microsoft.com/purview/how-to-manage-data-catalog-access-policies) to set permissions to the data product and the data assets it is linked too. Policies can also be used to provide a workflow for access requests, an audit trail for attestations, track active subscribers, and revoke access within Purview in a timely manner.

### Exercise: Create Data Products

**🫂 Team Activity:** [10 minutes] Identify a business unit (governance domain) and then on a whiteboard map out their data assets into groups that can easily be packaged together for a couple of specific use cases. It may be that transaction information and customer details that can be grouped into an Open Banking data product for example.

**✨ Pro Tip:** If lost, just use the 'Sales' example from above.

While its tempting to create a one-to-one mapping between data assets and Data products, it is important to note that a individual data asset can belong to zero-to-many Data products. i.e. the enterprise product hierarchy table, used across numerous reporting and downstream solutions. Carefully consider the trade-offs when deciding on the approach, especially across the entire data lifecycle, and when governance grows across the data estate.

**✨ Pro Tip:** Create a Key-Design-Decision (KDD) which articulates the rationale, considerations, and implications for whichever approach you decide. This will create transparency and an audit trail for this decision.

**✍️ Do in Purview:** [5 minutes]

- Define your Data products per Governance domain via the 'New data product' wizard. Provide a name and description, and list the use cases in the respective text area. Take advantage of rich text descriptions and bullet pointing for readability.
- In the Data product overview, note the status (draft/published).
- Now associate Data assets via the 'Add data assets' option as per the whiteboard exercise above. The Data assets added here should be relevant to the Data product and may belong to no, one, or more Data products.
- Associate any Terms via the 'Add term' option.
- Associate any OKRs via the 'Add OKR' option (more on this in the next lab).
- Review the data product owner contact, and ensure it correctly reflects the employee(s) directly responsible for its upkeep.

**✨ Pro Tip:** To speed up your curation experience, explore the option to let Copilot ([licence dependant](https://learn.microsoft.com/purview/copilot-in-purview-overview)) discover recommended data assets to associate with each Data product.

**✨ Pro Tip:** Did you know you can edit the contact description for data product contacts directly within Purview? If "Data product owner" is not descriptive enough, feel free to update it to include more context about their responsibilities.

![Edit Contact Description](./assets/edit-contact-description.png)

## Task 2: Defining Data Product Access

**⏰ Duration:** 15 minutes

**🎯 Outcome:** At the end of this task, you will have defined access controls for a Data product, enabling it for self-service consumption by end users.

### Understanding Data Product Access

[Access Policies](https://learn.microsoft.com/purview/how-to-manage-data-catalog-access-policies) are essential to ensure that data is used responsibly and in compliance with organizational policies. Data Access defines who can access the data product, what they can do with the data, and under what conditions they can access the data. Access policies are defined at the data product level and enforced across all data assets within it.

**🫂 Team Activity:** [15 minutes] Discuss access controls for a given data product you created in Task 1 of this lab.

- Outline the intended usage of that Data product, with a name and brief description. Does this required an access request workflow for end users?
- Define the access approval requirements for the Data product. Who are the people that need to approve and grant access to the physical data assets in the Data product?
  - Should employee manager approval be required?
- Is a privacy and compliance review required?
- Does the requestor need to accept any data use terms before proceeding with the request?
- Is there access duration requirement for that Data Product?

**✍️ Do in Purview:** [10 minutes] Now define the Data product access using the 'Manage access' option, adding in the relevant purpose and approval requirements based on the team activity. Repeat with other Data products.

---

**⏸️ Reflection:** You have now created Data products and defined access controls for each. How do you think this will help your organization in making data more discoverable and consumable? What are some of the challenges you foresee in maintaining these Data product - access controls as the business evolves?

**✨ Pro Tip:** Remember that you are aiming for a federated data governance model. The task of maintaining data products and access isn't all on you.

👉 [Continue: Lab 7](./Lab-07%20-%20OKRs.md)

