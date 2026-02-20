# Uptime Dashboard Take Home

This project is a frontend dashboard built as part of a take home assignment. The goal was to recreate the provided design while demonstrating clean Angular architecture, modern state management, and scalable component structure.

The application is built using Angular 21 with standalone components and signals. Styling is handled with Tailwind CSS and charts are rendered using Chart.js.

The focus of this implementation is clarity, simplicity, and realistic production patterns rather than over engineering.

## Tech Stack

Angular 21 (standalone components and signals)

Tailwind CSS

Chart.js

chartjs plugin datalabels

TypeScript

LocalStorage for persistence

## Features

Report list with search and pagination

Single report selection that updates the dashboard

Add report modal with form validation

Stats cards showing key metrics

Stacked bar chart for unit alerts

Donut chart with percentage labels

Persistent reports using browser storage

Responsive layout with modern SaaS styling

## Architecture Overview

The application uses a signal based store (`ReportStore`) as the single source of truth. Components consume computed state directly from the store and update it through explicit actions.

Standalone components are used throughout the project. There are no NgModules.

State is managed using Angular signals instead of RxJS for simplicity and clarity.

Charts automatically update when the selected report changes using signal effects.

The layout is built with Tailwind utility classes and flex/grid for responsive behavior.

## Folder Structure

src/app/core  
Contains the signal store

src/app/shared  
Shared models and reusable components

src/app/features/dashboard  
Dashboard container and feature components

## Running the Project

Install dependencies

```bash
npm install
```
