import { AltroneApplication, DataTable } from '../../src';
import {
  INVOICES,
  INVOICES2,
} from '../../src/components/dataTable/stories/INVOICES';

Cypress.Screenshot.defaults({
  overwrite: true,
});

describe('DataTable.cy.tsx', () => {
  it('default table snapshot', () => {
    cy.viewport(1360, 720);

    cy.mount(
      <AltroneApplication>
        <DataTable
          data={INVOICES}
          columns={[
            { accessor: 'description', label: 'Invoice Name' },
            { accessor: 'quantity', type: 'number', label: 'Quantity' },
            {
              accessor: 'price',
              type: 'currency',
              label: 'Amount',
              options: { currencyAccessor: 'currency' },
            },
            { accessor: 'date', type: 'month', label: 'Invoice date' },
            { accessor: 'location', label: 'Location' },
          ]}
        />
      </AltroneApplication>,
    );

    cy.compareSnapshot('dataTable-basic-light-1');
  });

  it('default table dark theme snapshot', () => {
    cy.viewport(1360, 720);

    cy.mount(
      <AltroneApplication theme="dark">
        <DataTable
          data={INVOICES}
          columns={[
            { accessor: 'description', label: 'Invoice Name' },
            { accessor: 'quantity', type: 'number', label: 'Quantity' },
            {
              accessor: 'price',
              type: 'currency',
              label: 'Amount',
              options: { currencyAccessor: 'currency' },
            },
            { accessor: 'date', type: 'month', label: 'Invoice date' },
            { accessor: 'location', label: 'Location' },
          ]}
        />
      </AltroneApplication>,
    );

    cy.compareSnapshot('dataTable-basic-dark-1');
  });

  it('default table snapshot 2', () => {
    cy.viewport(1360, 720);

    cy.mount(
      <AltroneApplication>
        <DataTable
          data={INVOICES2}
          columns={[
            {
              accessor: 'date',
              label: 'Invoice date',
              type: 'date',
            },
            {
              accessor: 'amount',
              label: 'Amount',
              type: 'currency',
            },
            {
              accessor: 'users',
              label: 'Users',
              type: 'array',
              options: { arrayAccessor: 'name', arrayDelimiter: '; ' },
            },
            { accessor: 'tags', label: 'Tags', type: 'array' },
            {
              accessor: 'isPaid',
              label: 'Paid',
              type: 'boolean',
            },
          ]}
        />
      </AltroneApplication>,
    );

    cy.compareSnapshot('dataTable-basic-light-2');
  });

  it('default table snapshot 2 (dark)', () => {
    cy.viewport(1360, 720);

    cy.mount(
      <AltroneApplication theme="dark">
        <DataTable
          data={INVOICES2}
          columns={[
            {
              accessor: 'date',
              label: 'Invoice date',
              type: 'date',
            },
            {
              accessor: 'amount',
              label: 'Amount',
              type: 'currency',
            },
            {
              accessor: 'users',
              label: 'Users',
              type: 'array',
              options: { arrayAccessor: 'name', arrayDelimiter: '; ' },
            },
            { accessor: 'tags', label: 'Tags', type: 'array' },
            {
              accessor: 'isPaid',
              label: 'Paid',
              type: 'boolean',
            },
          ]}
        />
      </AltroneApplication>,
    );

    cy.compareSnapshot('dataTable-basic-dark-2');
  });

  it('filters shapshot (light)', () => {
    cy.viewport(1360, 720);

    cy.mount(
      <AltroneApplication>
        <DataTable
          data={INVOICES}
          columns={[
            { accessor: 'description', label: 'Invoice Name' },
            {
              accessor: 'quantity',
              filterable: true,
              type: 'number',
              label: 'Quantity',
            },
            {
              accessor: 'price',
              type: 'currency',
              label: 'Amount',
              options: { currencyAccessor: 'currency' },
              filterable: true,
            },
            {
              accessor: 'date',
              type: 'month',
              label: 'Invoice date',
              filterable: true,
            },
            { accessor: 'location', label: 'Location' },
          ]}
        />
      </AltroneApplication>,
    );

    cy.contains('button', 'Filter').click();
    cy.compareSnapshot('dataTable-filters-1');

    cy.contains('button', 'Add filter').click();
    cy.contains('button', 'Invoice date').click();
    cy.compareSnapshot('dataTable-filters-2');

    cy.get('input[value="equals to"]').click();
    cy.get('button[title="is empty"]').click();
    cy.compareSnapshot('dataTable-filters-3');

    cy.get('input[value="is empty"]').click();
    cy.get('button[title="is between"]').click();
    cy.compareSnapshot('dataTable-filters-4');
  });

  it('sorting shapshot (light)', () => {
    cy.viewport(1360, 720);

    cy.mount(
      <AltroneApplication>
        <DataTable
          data={INVOICES}
          columns={[
            { accessor: 'description', label: 'Invoice Name' },
            {
              accessor: 'quantity',
              filterable: true,
              type: 'number',
              label: 'Quantity',
              sortable: true,
            },
            {
              accessor: 'price',
              type: 'currency',
              label: 'Amount',
              options: { currencyAccessor: 'currency' },
              filterable: true,
            },
            {
              accessor: 'date',
              type: 'month',
              label: 'Invoice date',
              filterable: true,
            },
            { accessor: 'location', label: 'Location' },
          ]}
        />
      </AltroneApplication>,
    );

    cy.contains('Quantity').click();
    cy.compareSnapshot('dataTable-sorting-1');

    cy.contains('Quantity').click();
    cy.compareSnapshot('dataTable-sorting-2');
  });

  it('selectable mode snapshot (light)', () => {
    cy.viewport(1360, 720);

    cy.mount(
      <AltroneApplication>
        <DataTable
          data={INVOICES}
          selectable
          columns={[
            { accessor: 'description', label: 'Invoice Name' },
            {
              accessor: 'quantity',
              filterable: true,
              type: 'number',
              label: 'Quantity',
            },
            {
              accessor: 'price',
              type: 'currency',
              label: 'Amount',
              options: { currencyAccessor: 'currency' },
            },
            {
              accessor: 'date',
              type: 'month',
              label: 'Invoice date',
            },
            { accessor: 'location', label: 'Location' },
          ]}
        />
      </AltroneApplication>,
    );

    cy.get('[title="Select rows"]').click();
    cy.compareSnapshot('dataTable-selectableMode-1');
  });
});
