![Banner](./assets/banner.png)

# Lab 14: Pricing and Licensing

## ProRail-context voor Data Stewards

**Praktijkkader (ProRail):** Kostensturing richt zich op maximale governance-impact voor kritieke assets binnen beschikbare budgetten.

**Rolfocus Data Steward:**
- Segmenteer governed assets op waarde en risico.
- Definieer criteria voor wanneer een asset governance-ready is.
- Monitor kosten versus adoptie en kwaliteitswinst per domein.

**Op te leveren bewijs:**
- Besliskader voor wel/niet cureren van assets.
- Kwartaaloverzicht met kosten, gebruik en governance-opbrengst.


## Didactische versterking

**Voorkennis-check (5 min):** Vraag welke governance-activiteiten nu als kostenpost worden gezien zonder zichtbare opbrengst.

**Leerroute:**
- Leg eerst het verschil uit tussen assetvolume en governancewaarde.
- Prioriteer vervolgens assets op risico en bedrijfsimpact.
- Verbind kosten aan concrete kwaliteits- en adoptieverbeteringen.

**Reflectievragen voor data stewards:**
- Welke assets moeten als eerste governed worden voor maximale impact?
- Welke kostenmeter vraagt actief stuurgedrag van stewards?


### Werkafspraak gedeelde Microsoft-omgeving

**Verplicht bij alle ✍️ Do in Purview oefeningen:** Voeg je initialen toe aan elk item dat je aanmaakt of wijzigt (bijvoorbeeld domeinen, termen, data producten, controls, rapporten, API-testobjecten).

**Naamconventie:** `[INITIALEN]-[onderdeel]-[korte-naam]`  
**Voorbeelden:** `JD-domain-spoorinfra`, `JD-term-herstelduur`, `JD-dp-storingsanalyse`.

**Waarom:** We werken in één gedeelde tenant. Deze afspraak voorkomt overschrijven, maakt eigenaarschap zichtbaar en versnelt opruimen/terugvinden.
 1: Understanding Operational Costs

> Microsoft Purview Solution: Settings

**⏰ Duration:** 15 minutes

**🎯 Outcome:** At the end of this task, will understand the pricing and cost implications for operating Microsoft Purview in your organization.

**🫂 Team Activity:** [15 minutes] Spend a few minutes reading through the context and pricing information below and have a conversation about it.

- Do you understand the definition of a Governed Asset?
- Can you estimate the average number of assets linked to a data product.

### Principles of Purview Pricing

1. **Fair Market Value** - Microsoft Purview is priced to reflect the value it provides to customers. The pricing is based on the features and capabilities that are included in the service.
2. **Consumption-Based** - Microsoft Purview is a consumption-based service. You only pay for what you use.
3. **Customer in Control** - Microsoft Purview is designed to give customers control over their costs. You can predict, monitor, and manage your governance costs.
4. **Transparent & Explainable** - Going forward, Microsoft Purview pricing is transparent and easy to understand.

### Pricing In Practice

There are two predictable billing meters that factor into the cost of operating Microsoft Purview. All prices are in US Dollars (USD).

1. **Unified Catalog**: A $0.0165 per asset per day or approximately $0.50 per unique [Governed Asset](https://learn.microsoft.com/en-us/purview/ms-purview-dg-pricing-concepts#what-is-a-governed-asset) per month cost. This covers Data Curation, Discovery, and Governed Access Polices.
2. **Data Management**: A $15 (basic) / $60 (standard) / $240 (advanced) cost per [Data Governance Processing Unit (DGPU)](https://learn.microsoft.com/en-us/purview/ms-purview-dg-pricing-concepts#data-governance-processing-units-explained). This covers Data Quality scanning and Health Controls - calculated on 60-minutes of processing time.

_If you previously operated Azure Purview (classic), note the always-on Data Map / Scanning / API costs have been subsumed and no longer apply in Microsoft Purview Data Governance._

**Security Copilot**: Optionally, you may wish to [integrate the Security Copilot capabilities](https://learn.microsoft.com/en-us/purview/copilot-in-purview-overview?bc=%2Fsecurity-copilot%2Fbreadcrumb%2Ftoc.json&toc=%2Fsecurity-copilot%2Ftoc.json) into Microsoft Purview. Security Copilot is a separate service that provides advanced security and compliance capabilities for Microsoft Purview and broader Microsoft Security products. It is optional and thus priced separately.

### 1. Unified Catalog: What is a Governed Asset?

A Data Asset which is curated for discovery in the Unified Catalog is considered 'governed' when either of these conditions are met ([full details](https://learn.microsoft.com/en-us/purview/ms-purview-dg-pricing-concepts#what-is-a-governed-asset)):

- It is attached to a Data Product or Critical Data Element
- It is annotated with a Term (glossary), ~~Custom Attribute~~

In other words, you can scan metadata into Microsoft Purview's Data Map (Multi-cloud Tables, Files, Datasets, Reports, Dashboards, Models etc.) without incurring costs until you decide to govern them. On average, only a minority (15-25%) of all assets are governed (in a large organization).

| Feature         | SKU      | Pay-As-You-Go Price                            |
| --------------- | -------- | ---------------------------------------------- |
| Unified Catalog | Standard | $0.0165 per asset per day or ~ $0.50 per month |

#### Examples in Practice

- **Example 1**: A SQL table is referenced within a data product. The same SQL table is used in five other data products. The SQL table is counted one time only, once a day.
- **Example 2**: I have created 50 governance domains and data products. But haven't attached any tables or files/reports/dashboards. In this case I won't be charged for any governed asset.
- **Example 3**: I accidentally attached a server to the data product. Purview counts just the server as a single asset, not all the children tables within it

### 2. Data Management: How is the SKU Determined?

Data management processing is high-value compute for data management workloads in most organizations. It is consumed by data quality, health controls and future data management capabilities. Data management compute utilization varies but factors that influence the cost of data management processing can include:

- Data volumes
- Complexity of data management rules and policies
- Physical topology of the data estate (cloud-based sources, on-premises infrastructure, networking, geo locations and residency requirements)

A Data Governance Processing Unit (DGPU) equates to 60 minutes of data management compute run across varying sets of nodes based on the workload need. The three options provide increasing speed and parallelism for choice and control (prices in USD):

| Feature                | SKU      | Pay-As-You-Go Price                      | vCores   |
| ---------------------- | -------- | ---------------------------------------- | -------- |
| Data Health Management | Basic    | $15 per Data Governance Processing Unit  | Up to 8  |
| Data Health Management | Standard | $60 per Data Governance Processing Unit  | Up to 16 |
| Data Health Management | Advanced | $240 per Data Governance Processing Unit | Up to 32 |

Some activities such as Purview introspecting its own metadata store to evaluate health controls, publish metrics into an externally connected Azure Data Lake Gen2 (or Microsoft Fabric OneLake), or assigning health actions do not require higher levels of compute to execute. These activities will always run in the **Basic** SKU.

Other activities such as executing data quality rules and profiling data, will benefit from a higher SKU to run faster and in parallel. The **Standard** SKU is recommended for most organizations. This information is also conveyed in Purview's Unified Catalog Settings (see screenshot below).

#### Switching Between SKUs/Tiers

All deployments of Microsoft Purview default to the **Basic** tier. Your Data Governance Administrator (role) will be able to change this tier at any time via the Purview Settings page. All data management rules for Data Quality and Data Estate Health will run on a single SKU as a pool of compute.

![Unified Catalog SKU Selector](./assets/unified-catalog-sku-selector.png)

#### Examples in Practice

- **Example**: I run 100 Data Management rules and controls in a single day, and each run produces 0.02 DGPU with the **Basic** SKU, then the total DGPU for that day would equal two (0.02 \* 100) DGPU, costing me $30.

### Tracking Governed Assets & Data Processing Units

Microsoft Purview provides an overview of the Cumulative governed assets and Data processing units of the Unified Catalog, enabling cost estimation.

**✍️ Do in Purview:** [5 minutes] Navigating the Settings > Usage Monitoring, review the **Cumulative governed assets** and **Data processing units** metrics.

![Tracking Governed Assets & Data Processing Units](./assets/usage-monitoring.png)

---

## Congratulations, that's a wrap!

**⏸️ Reflection:** Great job! You have made it to the end of the labs. This is a significant milestone in your learning journey. You have learned how to set up and configure Microsoft Purview, how to scan and classify data, and how to use the Unified Catalog to search and federate data governance.

🏁 [Complete: Back to Overview](./README.md)





