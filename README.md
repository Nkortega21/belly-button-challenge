# belly-button-challenge
UCI Data Analyst Module 14 - Interactive Visualizations


# Belly Button Biodiversity Dashboard
## Project Overview
This project creates an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The dataset highlights how a small subset of microbial species, also known as Operational Taxonomic Units (OTUs), are found in over 70% of individuals, while the majority are rare.

The dashboard provides visualizations to display the top 10 OTUs per individual, bubble charts representing each sample, and demographic metadata. The web app is deployed via GitHub Pages.

# Files
- index.html: Main HTML file that hosts the dashboard.
- static/js/app.js: JavaScript file for rendering charts, handling dropdown selections, and updating plots dynamically.
- static/css/style.css: Custom CSS for styling the dashboard.
- samples.json: JSON file containing microbial sample data (accessed via URL in the project).

# Features
## 1. Bar Chart
### Displays the top 10 OTUs found in a selected individual:

- Values: sample_values (top 10 OTU counts).
- Labels: otu_ids (top 10 OTU IDs).
- Hovertext: otu_labels (descriptions of the OTUs).
## 2. Bubble Chart
### Represents each sample with bubbles:

- X-axis: otu_ids (IDs of OTUs).
- Y-axis: sample_values (OTU counts).
- Bubble size: sample_values (larger counts = bigger bubbles).
- Bubble color: otu_ids (color-coded by OTU ID).
- Hovertext: otu_labels (descriptions of the OTUs).
## 3. Demographic Info
Displays demographic metadata for the selected individual. This information is dynamically updated as different samples are selected from the dropdown.

## 4. Interactive Dropdown
Allows users to select different individuals' samples from the dataset. The dashboard updates both the charts and the demographic info based on the selected sample.

### Collborators
Worked with Chris and Brendan to develop code
