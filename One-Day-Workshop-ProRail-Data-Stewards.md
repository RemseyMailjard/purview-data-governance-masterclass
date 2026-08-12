# 1-Daagse Variant - ProRail Data Stewards

## Doel van deze dag

Deze 1-daagse variant is ontworpen voor data stewards bij ProRail. De focus ligt op besluitvorming en governance in de praktijk, niet op volledige technische inrichting. Aan het einde van de dag heeft elk team een concreet steward-startpakket voor een eigen datadomein.

## Leerdoelen

1. Data governance vertalen naar ProRail-prioriteiten: veiligheid, beschikbaarheid, voorspelbaarheid en compliance.
2. Kritieke datatermen, eigenaarschap en kwaliteitsverwachtingen vastleggen.
3. Een eerste data product en toegangsaanpak ontwerpen voor een operationele use-case.
4. Stuurbare KPI's, controls en opvolgacties definiëren.

## Aanbevolen deelnemers

- Data stewards (primair)
- Domeinvertegenwoordigers uit operatie, onderhoud, verkeersleiding en veiligheid
- Optioneel: data owner, security/compliance vertegenwoordiger

## Voorbereiding (vooraf, 30-60 min per deelnemer)

Neem per deelnemer mee:

- 1 dataset of rapport dat in de praktijk vaak discussie oplevert
- 1 voorbeeld van onduidelijke definitie (bijv. storing, beschikbaarheid, vertragingsoorzaak)
- 1 voorbeeld van toegangsvraag of datakwaliteitsissue uit de laatste 3 maanden

## Dagindeling (8 uur inclusief pauzes)

### Blok 1 - 09:00-10:15

**Thema:** Waarom data governance voor ProRail cruciaal is  
**Labs:** [Lab-01 - Introduction and Overview.md](Lab-01%20-%20Introduction%20and%20Overview.md), [Lab-02 - Designing the Data Map.md](Lab-02%20-%20Designing%20the%20Data%20Map.md)

**Werkvorm:** Plenair + tafelgesprek

**ProRail-voorbeelden om te gebruiken:**

- Verschillende definities van "storing" tussen verkeersleiding, onderhoud en managementrapportage.
- Onduidelijkheid over "asset beschikbaar" bij wissels met tijdelijke snelheidsbeperkingen.
- Rapportages over punctualiteit die verschillende bronsets gebruiken.

**Opdracht (data steward):**

1. Benoem per tafel 3 kritieke besluiten die op data steunen.
2. Koppel elk besluit aan risico bij onjuiste of te late data.
3. Maak een eerste domeinkaart met eigenaar + steward.

**Output:**

- Steward stakeholdermap
- Top-10 kritieke datatermen (eerste versie)

### Pauze - 10:15-10:30

### Blok 2 - 10:30-12:00

**Thema:** Bronnen, begrippen en curatie  
**Labs:** [Lab-03 - Managing Data Sources.md](Lab-03%20-%20Managing%20Data%20Sources.md), [Lab-04 - Governance Domains and Terms.md](Lab-04%20-%20Governance%20Domains%20and%20Terms.md), [Lab-05 - Curating Data Assets.md](Lab-05%20-%20Curating%20Data%20Assets.md)

**Werkvorm:** Groepsopdracht met canvassen

**ProRail-voorbeelden om te gebruiken:**

- Assetdata: wissels, seinen, spoorsecties, storingshistorie.
- Onderhoudsdata: gepland vs. ongepland onderhoud, werkorders, inspectiebevindingen.
- Operationele data: rijpaden, verstoringen, herstelduur, impact op treinverkeer.

**Opdracht (data steward):**

1. Selecteer 1 kritieke bron per domein en bepaal steward-eigenaarschap.
2. Definieer 5 kerntermen met eenduidige definities.
3. Curateer 3 assets met beschrijving, termkoppeling en gebruiksbeperking.

**Output:**

- Bronregister met eigenaarschap en scan-/reviewritme
- Glossary mini-set (minimaal 5 termen)
- Curatiesjabloon voor kritieke assets

### Lunch - 12:00-13:00

### Blok 3 - 13:00-14:15

**Thema:** Data products, toegang en governance-doelen  
**Labs:** [Lab-06 - Data Products and Access.md](Lab-06%20-%20Data%20Products%20and%20Access.md), [Lab-07 - OKRs.md](Lab-07%20-%20OKRs.md)

**Werkvorm:** Team design sprint

**ProRail-voorbeelden om te gebruiken:**

- Data product "Storingsanalyse baanvak" voor operationele evaluatie.
- Data product "Onderhoudsvenster effectiviteit" voor planning en capaciteitsmanagement.
- Data product "Kritieke asset gezondheid" voor management- en veiligheidssturing.

**Opdracht (data steward):**

1. Ontwerp 1 data product met duidelijke scope en gebruikers.
2. Definieer toegangsregels op basis van rol (least privilege).
3. Stel 2-3 OKR's op voor datakwaliteit en adoptie.

**Output:**

- Data product canvas
- Toegangsmatrix (rol, doel, autorisatiepad)
- Kwartaal-OKR set

### Pauze - 14:15-14:30

### Blok 4 - 14:30-16:00

**Thema:** Health controls, data quality en acties  
**Labs:** [Lab-08 - Health Management Controls.md](Lab-08%20-%20Health%20Management%20Controls.md), [Lab-09 - Data Quality Management.md](Lab-09%20-%20Data%20Quality%20Management.md), [Lab-10 - Health Management Actions.md](Lab-10%20-%20Health%20Management%20Actions.md)

**Werkvorm:** Scenario-oefening

**ProRail-voorbeelden om te gebruiken:**

- Missing values op "hersteltijd storing" waardoor trendanalyse faalt.
- Verouderde assetstatussen na onderhoudsafhandeling.
- Dubbele registraties van incidenten tussen ketensystemen.

**Opdracht (data steward):**

1. Definieer 3 quality rules voor een kritisch data-element.
2. Maak een triagemodel (hoog/middel/laag) voor health alerts.
3. Definieer SLA: detectie, toewijzing en herstel.

**Output:**

- Quality rule set (v1)
- Alert triage- en escalatiematrix
- Herstel-SLA voorstel

### Blok 5 - 16:00-17:00

**Thema:** Rapportage, observability, continuiteit, API en kosten  
**Labs:** [Lab-11 - Health Management Reports.md](Lab-11%20-%20Health%20Management%20Reports.md), [Lab-12 - Observability.md](Lab-12%20-%20Observability.md), [Lab-13 - Business Continuity.md](Lab-13%20-%20Business%20Continuity.md), [Lab-14 - Custom API Functionality.md](Lab-14%20-%20Custom%20API%20Functionality.md), [Lab-15 - Pricing and Licensing.md](Lab-15%20-%20Pricing%20and%20Licensing.md)

**Werkvorm:** Beslisatelier + plenaire terugkoppeling

**ProRail-voorbeelden om te gebruiken:**

- Managementrapport dat niet aansluit op operationele brondefinities.
- Uitval van bronkoppeling waardoor dashboard "infra gezondheid" niet ververst.
- API-behoefte om steward metadata in een intern workflow- of ticketproces te tonen.
- Kostenafweging: welke assets eerst cureren op basis van risico/waarde.

**Opdracht (data steward):**

1. Definieer een maandrapport met 5 governance-KPI's.
2. Maak een continuiteitsscenario voor uitval van 1 kritieke bron.
3. Stel criteria op voor wel/niet opnemen als governed asset.

**Output:**

- Governance KPI scorecard
- Continuiteitskaart met fallback
- Kosten- en prioriteringskader

## Einde-dag opleverpakket

Aan het einde van de dag levert elk team op:

1. Domeinkaart met eigenaar/steward
2. Top-10 datatermen met definities
3. Data product canvas + toegangsmatrix
4. Quality rules + alert triage
5. KPI scorecard + 90-dagen actielijst

## 90-dagen opvolging (aanbevolen)

### Week 1-2

- Besluitvorming op eigenaarschap formaliseren.
- Glossary v1 valideren met domeinteams.

### Week 3-6

- Eerste governance-controls en quality rules operationeel maken.
- Toegangsproces voor minimaal 1 data product implementeren.

### Week 7-12

- Maandelijkse KPI-review starten.
- Eerste verbetercyclus afsluiten met lessons learned.

## Facilitatietips voor maximale ProRail-relevantie

- Laat elk voorbeeld eindigen in een operationeel besluit (niet alleen technisch inzicht).
- Vermijd abstracte definities zonder eigenaar, bron en kwaliteitsverwachting.
- Gebruik consequent dezelfde kernwoorden: storing, beschikbaarheid, herstelduur, kritieke asset, ketenimpact.
- Toets elke uitkomst op de vraag: helpt dit morgen de operatie veiliger en voorspelbaarder te maken?
