# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + JavaScript (JSX) + Vite, continuing `react-app/`. Confirmed by the user: first replace WordPress with a static React site. Converted from TypeScript to plain JSX on 2026-09-20 at the owner's request (see `docs/IMPLEMENTATION-STATUS.md`); earlier documents in this repo describing a TypeScript stack reflect that earlier phase.

## Product Purpose

Recreate the public Platinum Car Films website as a maintainable starting point for later component-by-component improvements. Preserve the core appearance, page content, navigation, and imagery; pixel-perfect reproduction is not required.

## Users

The source site addresses automotive film buyers, installers, distributors, OEM buyers, and vehicle owners. These audience descriptions come from the existing content.

## Capabilities and Constraints

This phase is static. Forms are previews and never send data or claim successful delivery. Menus, accordions, galleries, quote dialogs, and local search should work on the frontend. Backend integrations and the future data-driven warranty claim system are deferred.

## Brand Commitments

Use the current public site as the visual/content reference. The client wants to improve its design later, one component at a time.

## Evidence on Hand

`docs/SITE-INVESTIGATION.md`, the source archive, download manifest, and generated content under `react-app/public/content/`. Public-source content inconsistencies are recorded in the investigation; this migration does not invent replacement business terms.
