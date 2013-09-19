Exercise 4 - Charts
=========================

## Overview

In this exercise, we will make an awesome [chart](https://help.rallydev.com/apps/2.0rc1/doc/#!/api/Rally.ui.chart.Chart) showing story counts by schedule state.

1. In getData(), create a store to fetch stories only for these 3 schedule states [Defined, In-Progress, Completed]
2. In aggregateData(), loop through all stories and "bucketize" them

Once you have a chart rendering counts for the 3 schedule states:

3. Add a new schedule state 'Accepted'
4. Add new chart colors with the RallyChart config 'chartColors'  (see API)
5. Resize chart to 500x500 (TIP: See highcharts config for 'chart')
