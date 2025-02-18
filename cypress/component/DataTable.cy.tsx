import { AltroneApplication, DataTable, FilterType, dayjs } from '../../src';
import { INVOICES } from '../../src/components/dataTable/stories/INVOICES';
import { COUNTRIES } from '../../src/components/scrollable/Scrollable.constants';
import {
  EMPLOYEES,
  EmployeeType,
} from '../../src/components/dataTable/stories/EMPLOYEES';
import {
  DateFilterRules,
  NumberFilterRules,
} from '../../src/components/dataTable/DataTable.types';

Cypress.Screenshot.defaults({
  overwrite: true,
});

let runSnapshotTests = false;
let runFilterTests = true;

describe('DataTable.cy.tsx', () => {
  it('default table snapshot', () => {
    // cy.viewport(1360, 720);
    // cy.mount(
    //   <AltroneApplication>
    //     <DataTable
    //       data={INVOICES}
    //       columns={[
    //         { accessor: 'description', label: 'Invoice Name' },
    //         { accessor: 'quantity', type: 'number', label: 'Quantity' },
    //         {
    //           accessor: 'price',
    //           type: 'currency',
    //           label: 'Amount',
    //           options: { currencyAccessor: 'currency' },
    //         },
    //         { accessor: 'date', type: 'month', label: 'Invoice date' },
    //         { accessor: 'location', label: 'Location' },
    //       ]}
    //     />
    //   </AltroneApplication>,
    // );
    // cy.compareSnapshot('dataTable-basic-light-1');
  });

  it('default table dark theme snapshot', () => {
    // cy.viewport(1360, 720);
    // cy.mount(
    //   <AltroneApplication theme="dark">
    //     <DataTable
    //       data={INVOICES}
    //       columns={[
    //         { accessor: 'description', label: 'Invoice Name' },
    //         { accessor: 'quantity', type: 'number', label: 'Quantity' },
    //         {
    //           accessor: 'price',
    //           type: 'currency',
    //           label: 'Amount',
    //           options: { currencyAccessor: 'currency' },
    //         },
    //         { accessor: 'date', type: 'month', label: 'Invoice date' },
    //         { accessor: 'location', label: 'Location' },
    //       ]}
    //     />
    //   </AltroneApplication>,
    // );
    // cy.compareSnapshot('dataTable-basic-dark-1');
  });

  it('default table snapshot 2', () => {
    // cy.viewport(1360, 720);
    // cy.mount(
    //   <AltroneApplication>
    //     <DataTable
    //       data={INVOICES2}
    //       columns={[
    //         {
    //           accessor: 'date',
    //           label: 'Invoice date',
    //           type: 'date',
    //         },
    //         {
    //           accessor: 'amount',
    //           label: 'Amount',
    //           type: 'currency',
    //         },
    //         {
    //           accessor: 'users',
    //           label: 'Users',
    //           type: 'array',
    //           options: { arrayAccessor: 'name', arrayDelimiter: '; ' },
    //         },
    //         { accessor: 'tags', label: 'Tags', type: 'array' },
    //         {
    //           accessor: 'isPaid',
    //           label: 'Paid',
    //           type: 'boolean',
    //         },
    //       ]}
    //     />
    //   </AltroneApplication>,
    // );
    // cy.compareSnapshot('dataTable-basic-light-2');
  });

  it('default table snapshot 2 (dark)', () => {
    // cy.viewport(1360, 720);
    // cy.mount(
    //   <AltroneApplication theme="dark">
    //     <DataTable
    //       data={INVOICES2}
    //       columns={[
    //         {
    //           accessor: 'date',
    //           label: 'Invoice date',
    //           type: 'date',
    //         },
    //         {
    //           accessor: 'amount',
    //           label: 'Amount',
    //           type: 'currency',
    //         },
    //         {
    //           accessor: 'users',
    //           label: 'Users',
    //           type: 'array',
    //           options: { arrayAccessor: 'name', arrayDelimiter: '; ' },
    //         },
    //         { accessor: 'tags', label: 'Tags', type: 'array' },
    //         {
    //           accessor: 'isPaid',
    //           label: 'Paid',
    //           type: 'boolean',
    //         },
    //       ]}
    //     />
    //   </AltroneApplication>,
    // );
    // cy.compareSnapshot('dataTable-basic-dark-2');
  });

  it('filters shapshot (light)', () => {
    // cy.viewport(1360, 720);
    // cy.mount(
    //   <AltroneApplication>
    //     <DataTable
    //       data={INVOICES}
    //       columns={[
    //         { accessor: 'description', label: 'Invoice Name' },
    //         {
    //           accessor: 'quantity',
    //           filterable: true,
    //           type: 'number',
    //           label: 'Quantity',
    //         },
    //         {
    //           accessor: 'price',
    //           type: 'currency',
    //           label: 'Amount',
    //           options: { currencyAccessor: 'currency' },
    //           filterable: true,
    //         },
    //         {
    //           accessor: 'date',
    //           type: 'month',
    //           label: 'Invoice date',
    //           filterable: true,
    //         },
    //         { accessor: 'location', label: 'Location' },
    //       ]}
    //     />
    //   </AltroneApplication>,
    // );
    // cy.contains('button', 'Filter').click();
    // cy.compareSnapshot('dataTable-filters-1');
    // cy.contains('button', 'Add filter').click();
    // cy.contains('button', 'Invoice date').click();
    // cy.compareSnapshot('dataTable-filters-2');
    // cy.get('input[value="equals to"]').click();
    // cy.get('button[title="is empty"]').click();
    // cy.compareSnapshot('dataTable-filters-3');
    // cy.get('input[value="is empty"]').click();
    // cy.get('button[title="is between"]').click();
    // cy.compareSnapshot('dataTable-filters-4');
  });

  it('sorting shapshot (light)', () => {
    // cy.viewport(1360, 720);
    // cy.mount(
    //   <AltroneApplication>
    //     <DataTable
    //       data={INVOICES}
    //       columns={[
    //         { accessor: 'description', label: 'Invoice Name' },
    //         {
    //           accessor: 'quantity',
    //           filterable: true,
    //           type: 'number',
    //           label: 'Quantity',
    //           sortable: true,
    //         },
    //         {
    //           accessor: 'price',
    //           type: 'currency',
    //           label: 'Amount',
    //           options: { currencyAccessor: 'currency' },
    //           filterable: true,
    //         },
    //         {
    //           accessor: 'date',
    //           type: 'month',
    //           label: 'Invoice date',
    //           filterable: true,
    //         },
    //         { accessor: 'location', label: 'Location' },
    //       ]}
    //     />
    //   </AltroneApplication>,
    // );
    // cy.contains('Quantity').click();
    // cy.compareSnapshot('dataTable-sorting-1');
    // cy.contains('Quantity').click();
    // cy.compareSnapshot('dataTable-sorting-2');
  });

  it('selectable mode snapshot (light)', () => {
    // cy.viewport(1360, 720);
    // cy.mount(
    //   <AltroneApplication>
    //     <DataTable
    //       data={INVOICES}
    //       selectable
    //       columns={[
    //         { accessor: 'description', label: 'Invoice Name' },
    //         {
    //           accessor: 'quantity',
    //           filterable: true,
    //           type: 'number',
    //           label: 'Quantity',
    //         },
    //         {
    //           accessor: 'price',
    //           type: 'currency',
    //           label: 'Amount',
    //           options: { currencyAccessor: 'currency' },
    //         },
    //         {
    //           accessor: 'date',
    //           type: 'month',
    //           label: 'Invoice date',
    //         },
    //         { accessor: 'location', label: 'Location' },
    //       ]}
    //     />
    //   </AltroneApplication>,
    // );
    // cy.get('[title="Select rows"]').click();
    // cy.compareSnapshot('dataTable-selectableMode-1');
  });

  it('when user clicks on the checkbox icon Altrone needs to show column with checkboxes', () => {
    cy.viewport(1360, 720);
    cy.mount(
      <AltroneApplication>
        <DataTable
          data={COUNTRIES}
          rowsPerPage={5}
          selectable
          columns={[
            { accessor: 'flag', label: 'Flag', width: '80px' },
            {
              accessor: 'country',
              label: 'Country Name',
              filterable: true,
              type: 'text',
            },
            { accessor: 'capital', label: 'Capital' },
          ]}
        />
      </AltroneApplication>,
    );

    cy.get('[title="Select rows"]').click();
    cy.get('table > thead > tr > th').should('have.length', 4);
  });

  it('check number filters', () => {
    if (!runFilterTests) return;

    cy.viewport(1360, 720);
    cy.mount(
      <AltroneApplication>
        <DataTable<EmployeeType>
          data={EMPLOYEES}
          rowsPerPage={20}
          selectable
          data-testid="table"
          columns={[
            {
              accessor: 'firstName',
              label: 'Employee',
            },
            {
              accessor: 'inStaff',
              label: 'In Staff',
              type: 'boolean',
              filterable: true,
            },
            {
              accessor: 'role',
              label: 'Position',
              filterable: true,
            },
            {
              accessor: 'age',
              label: 'Age',
              type: 'number',
              width: '100px',
              filterable: true,
              sortable: true,
            },
            {
              accessor: 'salary',
              label: 'Salary',
              width: '150px',
              filterable: true,
              sortable: true,
              type: 'currency',
            },
            { accessor: 'phoneNumber', label: 'Phone' },
            {
              accessor: 'skills',
              label: 'Skills',
              filterable: true,
              type: 'array',
            },
          ]}
        />
      </AltroneApplication>,
    );

    let latestRule = 'equals to';

    const checkEmployeeNames = (values: string[]) => {
      return cy.get('table tr td:first-child').then(($elements) => {
        const elementsArray = $elements.toArray();
        expect(elementsArray.map((el) => el.textContent?.trim())).to.deep.equal(
          values,
        );
      });
    };

    const changeFilterRule = (
      rule: string,
      value?: string,
      value2?: string,
    ) => {
      cy.get('button').contains('Filters (1)').click();
      cy.get(`input[placeholder="${latestRule}"]`).click();
      cy.get('button').contains(rule).click();

      if (value && !value2) {
        cy.get('[data-filter-name="age"][data-filter-control="true"]')
          .clear()
          .type(value)
          .type('{Del}');
      } else if (value && value2) {
        cy.get(
          '[data-filter-name="age"][data-filter-control="true"][data-filter-control-side="start"]',
        )
          .clear()
          .type(value)
          .type('{Del}');
      }

      if (value2) {
        cy.get(
          '[data-filter-name="age"][data-filter-control="true"][data-filter-control-side="end"]',
        )
          .clear()
          .type(value2)
          .type('{Del}');
      }

      latestRule = rule;
      cy.get('button').contains('Apply').click();
    };

    checkEmployeeNames([
      'John',
      'Jane',
      'Emily',
      'Michael',
      'Jessica',
      'David',
      'Laura',
      'Robert',
      'Sarah',
      'James',
    ]);

    cy.get('button').contains('Filters').click();
    cy.get('button').contains('Add filter').click();
    cy.get('button').contains('Age').click();
    cy.get('[data-filter-name="age"][data-filter-control="true"]').type('28');
    cy.get('button').contains('Apply').click();

    checkEmployeeNames(['Jessica']);

    changeFilterRule('not equals to');
    checkEmployeeNames([
      'John',
      'Emily',
      'Michael',
      'David',
      'Laura',
      'Robert',
      'Sarah',
      'James',
    ]);

    changeFilterRule('>', '33');
    checkEmployeeNames(['Emily', 'Michael', 'Robert', 'James']);

    changeFilterRule('≥', '33');
    checkEmployeeNames(['Emily', 'Michael', 'Robert', 'Sarah', 'James']);

    changeFilterRule('<', '30');
    checkEmployeeNames(['Jessica', 'Laura']);

    changeFilterRule('≤');
    checkEmployeeNames(['John', 'Jessica', 'Laura']);

    changeFilterRule('is between', '30', '39');
    checkEmployeeNames(['John', 'Emily', 'David', 'Robert', 'Sarah']);

    changeFilterRule('is not between', '30', '39');
    checkEmployeeNames(['Michael', 'Jessica', 'Laura', 'James']);

    changeFilterRule('is empty');
    checkEmployeeNames(['Jane']);

    changeFilterRule('is not empty');
    checkEmployeeNames([
      'John',
      'Emily',
      'Michael',
      'Jessica',
      'David',
      'Laura',
      'Robert',
      'Sarah',
      'James',
    ]);
  });

  it('check string filters', () => {
    if (!runFilterTests) return;

    cy.viewport(1360, 720);
    cy.mount(
      <AltroneApplication>
        <DataTable<EmployeeType>
          data={EMPLOYEES}
          rowsPerPage={20}
          selectable
          data-testid="table"
          columns={[
            {
              accessor: 'firstName',
              label: 'Employee',
            },
            {
              accessor: 'inStaff',
              label: 'In Staff',
              type: 'boolean',
              filterable: true,
            },
            {
              accessor: 'role',
              label: 'Position',
              filterable: true,
            },
            {
              accessor: 'age',
              label: 'Age',
              type: 'number',
              width: '100px',
              filterable: true,
              sortable: true,
            },
            {
              accessor: 'salary',
              label: 'Salary',
              width: '150px',
              filterable: true,
              sortable: true,
              type: 'currency',
            },
            { accessor: 'phoneNumber', label: 'Phone' },
            {
              accessor: 'skills',
              label: 'Skills',
              filterable: true,
              type: 'array',
            },
          ]}
        />
      </AltroneApplication>,
    );

    let latestRule = 'contains';

    const checkEmployeeNames = (values: string[]) => {
      return cy.get('table', { timeout: 0 }).then(($element) => {
        const labels = Array.from($element[0].rows)
          .slice(1)
          .map((row) => row.cells[0].textContent?.trim());

        expect(labels).to.deep.equal(values);
      });
    };

    const changeFilterRule = (rule: string, value?: string) => {
      cy.get('button').contains('Filters (1)').click();
      cy.get(`input[placeholder="${latestRule}"]`).click();
      cy.get('button').contains(rule).click();

      if (value) {
        cy.get('[data-filter-name="role"][data-filter-control="true"]')
          .clear()
          .type(value)
          .type('{Del}');
      }

      latestRule = rule;
      cy.get('button').contains('Apply').click();
    };

    checkEmployeeNames([
      'John',
      'Jane',
      'Emily',
      'Michael',
      'Jessica',
      'David',
      'Laura',
      'Robert',
      'Sarah',
      'James',
    ]);

    cy.get('button').contains('Filters').click();
    cy.get('button').contains('Add filter').click();
    cy.get('button').contains('Position').click();
    cy.get('[data-filter-name="role"][data-filter-control="true"]').type(
      'frontend',
    );
    cy.get('button').contains('Apply').click();

    checkEmployeeNames(['John', 'Jane', 'Laura']);

    changeFilterRule('not contains');
    checkEmployeeNames([
      'Emily',
      'Michael',
      'Jessica',
      'David',
      'Robert',
      'Sarah',
      'James',
    ]);

    changeFilterRule('equals to', 'backend developer');
    checkEmployeeNames(['Emily', 'Michael', 'David', 'Sarah', 'James']);

    changeFilterRule('not equals to');
    checkEmployeeNames(['John', 'Jane', 'Jessica', 'Laura', 'Robert']);

    changeFilterRule('is empty');
    checkEmployeeNames([]);

    changeFilterRule('is not empty');
    checkEmployeeNames([
      'John',
      'Jane',
      'Emily',
      'Michael',
      'Jessica',
      'David',
      'Laura',
      'Robert',
      'Sarah',
      'James',
    ]);
  });

  it('check array filters', () => {
    if (!runFilterTests) return;

    cy.viewport(1360, 720);
    cy.mount(
      <AltroneApplication>
        <DataTable<EmployeeType>
          data={EMPLOYEES}
          rowsPerPage={20}
          selectable
          data-testid="table"
          columns={[
            {
              accessor: 'firstName',
              label: 'Employee',
            },
            {
              accessor: 'inStaff',
              label: 'In Staff',
              type: 'boolean',
              filterable: true,
            },
            {
              accessor: 'role',
              label: 'Position',
              filterable: true,
            },
            {
              accessor: 'age',
              label: 'Age',
              type: 'number',
              width: '100px',
              filterable: true,
              sortable: true,
            },
            {
              accessor: 'salary',
              label: 'Salary',
              width: '150px',
              filterable: true,
              sortable: true,
              type: 'currency',
            },
            { accessor: 'phoneNumber', label: 'Phone' },
            {
              accessor: 'skills',
              label: 'Skills',
              filterable: true,
              type: 'array',
            },
          ]}
        />
      </AltroneApplication>,
    );

    let latestRule = 'is contained in';

    const checkEmployeeNames = (values: string[]) => {
      return cy.get('table', { timeout: 0 }).then(($element) => {
        const labels = Array.from($element[0].rows)
          .slice(1)
          .map((row) => row.cells[0].textContent?.trim());

        expect(labels).to.deep.equal(values);
      });
    };

    const changeFilterRule = (rule: string, values?: string[]) => {
      cy.get('button').contains('Filters (1)').click();
      cy.get(`input[placeholder="${latestRule}"]`).click();
      cy.get('button').contains(rule).click();

      cy.get(
        'input[data-filter-control="true"][data-filter-name="skills"]',
      ).click();
      cy.get('button[role="checkbox"][aria-checked="true"]').then(
        ($elements) => {
          const elementsArray = $elements.toArray();
          for (const element of elementsArray) {
            element.click();
          }
        },
      );

      for (const value of values) {
        cy.get(`button[title="${value}"]`).click();
      }

      latestRule = rule;
      cy.get('button').contains('Apply').click();
    };

    checkEmployeeNames([
      'John',
      'Jane',
      'Emily',
      'Michael',
      'Jessica',
      'David',
      'Laura',
      'Robert',
      'Sarah',
      'James',
    ]);

    cy.get('button').contains('Filters').click();
    cy.get('button').contains('Add filter').click();
    cy.get('button').contains('Skills').click();

    cy.get('input[placeholder="JavaScript"]').click();
    for (const value of ['JavaScript', 'React', 'Node.js']) {
      cy.get(`button[title="${value}"]`).click();
    }

    cy.get('button').contains('Apply').click();

    checkEmployeeNames(['John', 'Jessica', 'Laura']);

    changeFilterRule('is not contained in', ['JavaScript', 'Spring']);
    checkEmployeeNames(['Emily', 'David', 'Sarah', 'James']);
  });

  it('check boolean filters', () => {
    if (!runFilterTests) return;

    cy.viewport(1360, 720);
    cy.mount(
      <AltroneApplication>
        <DataTable<EmployeeType>
          data={EMPLOYEES}
          rowsPerPage={20}
          selectable
          data-testid="table"
          columns={[
            {
              accessor: 'firstName',
              label: 'Employee',
            },
            {
              accessor: 'inStaff',
              label: 'In Staff',
              type: 'boolean',
              filterable: true,
            },
            {
              accessor: 'role',
              label: 'Position',
              filterable: true,
            },
            {
              accessor: 'age',
              label: 'Age',
              type: 'number',
              width: '100px',
              filterable: true,
              sortable: true,
            },
            {
              accessor: 'salary',
              label: 'Salary',
              width: '150px',
              filterable: true,
              sortable: true,
              type: 'currency',
            },
            { accessor: 'phoneNumber', label: 'Phone' },
            {
              accessor: 'skills',
              label: 'Skills',
              filterable: true,
              type: 'array',
            },
          ]}
        />
      </AltroneApplication>,
    );

    let latestRule = 'is positive';

    const checkEmployeeNames = (values: string[]) => {
      return cy.get('table', { timeout: 0 }).then(($element) => {
        const labels = Array.from($element[0].rows)
          .slice(1)
          .map((row) => row.cells[0].textContent?.trim());

        expect(labels).to.deep.equal(values);
      });
    };

    const changeFilterRule = (rule: string) => {
      cy.get('button').contains('Filters (1)').click();
      cy.get(`input[placeholder="${latestRule}"]`).click();
      cy.get('button').contains(rule).click();

      latestRule = rule;
      cy.get('button').contains('Apply').click();
    };

    checkEmployeeNames([
      'John',
      'Jane',
      'Emily',
      'Michael',
      'Jessica',
      'David',
      'Laura',
      'Robert',
      'Sarah',
      'James',
    ]);

    cy.get('button').contains('Filters').click();
    cy.get('button').contains('Add filter').click();
    cy.get('button').contains('In Staff').click();

    cy.get('button').contains('Apply').click();

    checkEmployeeNames([
      'John',
      'Emily',
      'Jessica',
      'David',
      'Robert',
      'Sarah',
    ]);

    changeFilterRule('is negative');
    checkEmployeeNames(['Jane', 'Michael', 'Laura', 'James']);
  });

  it('check date filters', () => {
    if (!runFilterTests) return;
    cy.viewport(1360, 720);
    cy.mount(
      <AltroneApplication>
        <DataTable
          data={INVOICES}
          rowsPerPage={20}
          selectable
          data-testid="table"
          columns={[
            {
              accessor: 'description',
              label: 'Name',
            },
            {
              accessor: 'date',
              label: 'Date',
              type: 'date',
              filterable: true,
            },
          ]}
          defaultFilters={[
            {
              field: 'date',
              type: FilterType.date,
              columnType: 'date',
              conditions: [
                {
                  rule: DateFilterRules.equal,
                  join: 'AND',
                  value: dayjs('2024-03-15'),
                  minValue: dayjs('2024-03-01'),
                  maxValue: dayjs('2024-03-31'),
                },
              ],
            },
          ]}
        />
      </AltroneApplication>,
    );

    let latestRule = 'equals to';

    const checkInvoices = (values: string[]) => {
      return cy.get('table', { timeout: 0 }).then(($element) => {
        console.log($element[0]);

        const labels = Array.from($element[0].rows)
          .slice(1)
          .map((row) => row.cells[0].textContent?.trim());

        expect(labels).to.deep.equal(values);
      });
    };

    const changeFilterRule = (rule: string, date1?: string) => {
      cy.get('button').contains('Filters (1)').click();
      cy.get(`input[placeholder="${latestRule}"]`).click();
      cy.get('button').contains(rule).click();

      if (date1) {
        cy.get('[data-filter-name="date"][data-filter-control="true"]').click();
        cy.get(`button[data-date="${date1}"]`).click();
      }

      latestRule = rule;
      cy.get('button').contains('Apply').click();
    };

    checkInvoices(['Photography Services']);

    changeFilterRule('not equals to');
    checkInvoices([
      'Web Development',
      'Graphic Design',
      'SEO Services',
      'Content Creation',
      'Social Media Management',
      'Email Marketing Campaign',
      'Consulting Services',
      'Logo Design',
      'Website Maintenance',
      'Copywriting Services',
      'Video Editing',
      'Brand Strategy',
      'E-commerce Setup',
      'UX/UI Design',
    ]);

    changeFilterRule('>');
    checkInvoices([
      'Website Maintenance',
      'Copywriting Services',
      'Video Editing',
      'Brand Strategy',
      'E-commerce Setup',
      'UX/UI Design',
    ]);

    changeFilterRule('≥');
    checkInvoices([
      'Photography Services',
      'Website Maintenance',
      'Copywriting Services',
      'Video Editing',
      'Brand Strategy',
      'E-commerce Setup',
      'UX/UI Design',
    ]);

    changeFilterRule('<');
    checkInvoices([
      'Web Development',
      'Graphic Design',
      'SEO Services',
      'Content Creation',
      'Social Media Management',
      'Email Marketing Campaign',
      'Consulting Services',
      'Logo Design',
    ]);

    changeFilterRule('≤');
    checkInvoices([
      'Web Development',
      'Graphic Design',
      'SEO Services',
      'Content Creation',
      'Social Media Management',
      'Email Marketing Campaign',
      'Consulting Services',
      'Logo Design',
      'Photography Services',
    ]);

    changeFilterRule('is between');
    checkInvoices([
      'Email Marketing Campaign',
      'Consulting Services',
      'Logo Design',
      'Photography Services',
    ]);

    changeFilterRule('is beyond');
    checkInvoices([
      'Web Development',
      'Graphic Design',
      'SEO Services',
      'Content Creation',
      'Social Media Management',
      'Website Maintenance',
      'Copywriting Services',
      'Video Editing',
      'Brand Strategy',
      'E-commerce Setup',
      'UX/UI Design',
    ]);
  });

  it('check month filters', () => {
    if (!runFilterTests) return;
    cy.viewport(1360, 720);
    cy.mount(
      <AltroneApplication>
        <DataTable
          data={INVOICES}
          rowsPerPage={20}
          selectable
          data-testid="table"
          columns={[
            {
              accessor: 'description',
              label: 'Name',
            },
            {
              accessor: 'date',
              label: 'Date',
              type: 'month',
              filterable: true,
            },
          ]}
          defaultFilters={[
            {
              field: 'date',
              type: FilterType.date,
              columnType: 'month',
              conditions: [
                {
                  rule: DateFilterRules.equal,
                  join: 'AND',
                  value: dayjs('2024-03-15'),
                  minValue: dayjs('2024-02-01'),
                  maxValue: dayjs('2024-03-20'),
                },
              ],
            },
          ]}
        />
      </AltroneApplication>,
    );

    let latestRule = 'equals to';

    const checkInvoices = (values: string[]) => {
      return cy.get('table', { timeout: 0 }).then(($element) => {
        console.log($element[0]);

        const labels = Array.from($element[0].rows)
          .slice(1)
          .map((row) => row.cells[0].textContent?.trim());

        expect(labels).to.deep.equal(values);
      });
    };

    const changeFilterRule = (rule: string, date1?: string) => {
      cy.get('button').contains('Filters (1)').click();
      cy.get(`input[placeholder="${latestRule}"]`).click();
      cy.get('button').contains(rule).click();

      if (date1) {
        cy.get('[data-filter-name="date"][data-filter-control="true"]').click();
        cy.get(`button[data-date="${date1}"]`).click();
      }

      latestRule = rule;
      cy.get('button').contains('Apply').click();
    };

    checkInvoices([
      'Email Marketing Campaign',
      'Consulting Services',
      'Logo Design',
      'Photography Services',
    ]);

    changeFilterRule('not equals to');
    checkInvoices([
      'Web Development',
      'Graphic Design',
      'SEO Services',
      'Content Creation',
      'Social Media Management',
      'Website Maintenance',
      'Copywriting Services',
      'Video Editing',
      'Brand Strategy',
      'E-commerce Setup',
      'UX/UI Design',
    ]);

    changeFilterRule('>');
    checkInvoices([
      'Website Maintenance',
      'Copywriting Services',
      'Video Editing',
      'Brand Strategy',
      'E-commerce Setup',
      'UX/UI Design',
    ]);

    changeFilterRule('≥');
    checkInvoices([
      'Email Marketing Campaign',
      'Consulting Services',
      'Logo Design',
      'Photography Services',
      'Website Maintenance',
      'Copywriting Services',
      'Video Editing',
      'Brand Strategy',
      'E-commerce Setup',
      'UX/UI Design',
    ]);

    changeFilterRule('<');
    checkInvoices([
      'Web Development',
      'Graphic Design',
      'SEO Services',
      'Content Creation',
      'Social Media Management',
    ]);

    changeFilterRule('≤');
    checkInvoices([
      'Web Development',
      'Graphic Design',
      'SEO Services',
      'Content Creation',
      'Social Media Management',
      'Email Marketing Campaign',
      'Consulting Services',
      'Logo Design',
      'Photography Services',
    ]);

    changeFilterRule('is between');
    checkInvoices([
      'SEO Services',
      'Content Creation',
      'Social Media Management',
      'Email Marketing Campaign',
      'Consulting Services',
      'Logo Design',
      'Photography Services',
    ]);

    changeFilterRule('is beyond');
    checkInvoices([
      'Web Development',
      'Graphic Design',
      'Website Maintenance',
      'Copywriting Services',
      'Video Editing',
      'Brand Strategy',
      'E-commerce Setup',
      'UX/UI Design',
    ]);
  });

  it('check year filters', () => {
    if (!runFilterTests) return;

    cy.viewport(1360, 720);
    cy.mount(
      <AltroneApplication>
        <DataTable
          data={INVOICES}
          rowsPerPage={20}
          selectable
          data-testid="table"
          columns={[
            {
              accessor: 'description',
              label: 'Name',
            },
            {
              accessor: 'date',
              label: 'Date',
              type: 'year',
              filterable: true,
            },
          ]}
          defaultFilters={[
            {
              field: 'date',
              type: FilterType.date,
              columnType: 'year',
              conditions: [
                {
                  rule: DateFilterRules.equal,
                  join: 'AND',
                  value: dayjs('2024-03-15'),
                  minValue: dayjs('2024'),
                  maxValue: dayjs('2025'),
                },
              ],
            },
          ]}
        />
      </AltroneApplication>,
    );

    let latestRule = 'equals to';

    const checkInvoices = (values: string[]) => {
      return cy.get('table', { timeout: 0 }).then(($element) => {
        console.log($element[0]);

        const labels = Array.from($element[0].rows)
          .slice(1)
          .map((row) => row.cells[0].textContent?.trim());

        expect(labels).to.deep.equal(values);
      });
    };

    const changeFilterRule = (rule: string, date1?: string) => {
      cy.get('button').contains('Filters (1)').click();
      cy.get(`input[placeholder="${latestRule}"]`).click();
      cy.get('button').contains(rule).click();

      if (date1) {
        cy.get('[data-filter-name="date"][data-filter-control="true"]').click();
        cy.get(`button[data-date="${date1}"]`).click();
      }

      latestRule = rule;
      cy.get('button').contains('Apply').click();
    };

    checkInvoices([
      'Graphic Design',
      'SEO Services',
      'Content Creation',
      'Social Media Management',
      'Email Marketing Campaign',
      'Consulting Services',
      'Logo Design',
      'Photography Services',
      'Website Maintenance',
      'Copywriting Services',
      'Video Editing',
      'Brand Strategy',
      'E-commerce Setup',
    ]);

    changeFilterRule('not equals to');
    checkInvoices(['Web Development', 'UX/UI Design']);

    changeFilterRule('>');
    checkInvoices(['UX/UI Design']);

    changeFilterRule('≥');
    checkInvoices([
      'Graphic Design',
      'SEO Services',
      'Content Creation',
      'Social Media Management',
      'Email Marketing Campaign',
      'Consulting Services',
      'Logo Design',
      'Photography Services',
      'Website Maintenance',
      'Copywriting Services',
      'Video Editing',
      'Brand Strategy',
      'E-commerce Setup',
      'UX/UI Design',
    ]);

    changeFilterRule('<');
    checkInvoices(['Web Development']);

    changeFilterRule('≤');
    checkInvoices([
      'Web Development',
      'Graphic Design',
      'SEO Services',
      'Content Creation',
      'Social Media Management',
      'Email Marketing Campaign',
      'Consulting Services',
      'Logo Design',
      'Photography Services',
      'Website Maintenance',
      'Copywriting Services',
      'Video Editing',
      'Brand Strategy',
      'E-commerce Setup',
    ]);

    changeFilterRule('is between');
    checkInvoices([
      'Graphic Design',
      'SEO Services',
      'Content Creation',
      'Social Media Management',
      'Email Marketing Campaign',
      'Consulting Services',
      'Logo Design',
      'Photography Services',
      'Website Maintenance',
      'Copywriting Services',
      'Video Editing',
      'Brand Strategy',
      'E-commerce Setup',
      'UX/UI Design',
    ]);

    changeFilterRule('is beyond');
    checkInvoices(['Web Development']);
  });

  it('check default state values', () => {
    cy.viewport(1360, 720);
    cy.mount(
      <AltroneApplication>
        <DataTable<EmployeeType>
          data={EMPLOYEES}
          rowsPerPage={4}
          data-testid="table"
          defaultPage={2}
          defaultFilters={[
            {
              field: 'age',
              type: FilterType.number,
              columnType: 'number',
              conditions: [
                { rule: NumberFilterRules.gte, join: 'AND', value: 25 },
              ],
            },
          ]}
          defaultSort={{
            field: 'age',
            direction: 'desc',
          }}
          columns={[
            {
              accessor: 'firstName',
              label: 'Employee',
            },
            {
              accessor: 'inStaff',
              label: 'In Staff',
              type: 'boolean',
              filterable: true,
            },
            {
              accessor: 'role',
              label: 'Position',
              filterable: true,
            },
            {
              accessor: 'age',
              label: 'Age',
              type: 'number',
              width: '100px',
              filterable: true,
              sortable: true,
            },
            {
              accessor: 'salary',
              label: 'Salary',
              width: '150px',
              filterable: true,
              sortable: true,
              type: 'currency',
            },
            { accessor: 'phoneNumber', label: 'Phone' },
            {
              accessor: 'skills',
              label: 'Skills',
              filterable: true,
              type: 'array',
            },
          ]}
        />
      </AltroneApplication>,
    );

    const checkEmployeeNames = (values: string[]) => {
      return cy.get('table', { timeout: 0 }).then(($element) => {
        const labels = Array.from($element[0].rows)
          .slice(1)
          .map((row) => row.cells[0].textContent?.trim());

        expect(labels).to.deep.equal(values);
      });
    };

    checkEmployeeNames(['Sarah', 'David', 'John', 'Laura']);
  });

  it('when user clicks on Clear button, we need to show all rows', () => {
    cy.viewport(1360, 720);
    cy.mount(
      <AltroneApplication>
        <DataTable<EmployeeType>
          data={EMPLOYEES}
          rowsPerPage={20}
          data-testid="table"
          columns={[
            {
              accessor: 'firstName',
              label: 'Employee',
            },
            {
              accessor: 'inStaff',
              label: 'In Staff',
              type: 'boolean',
              filterable: true,
            },
          ]}
        />
      </AltroneApplication>,
    );

    const checkEmployeeNames = (values: string[]) => {
      return cy.get('table', { timeout: 0 }).then(($element) => {
        const labels = Array.from($element[0].rows)
          .slice(1)
          .map((row) => row.cells[0].textContent?.trim());

        expect(labels).to.deep.equal(values);
      });
    };

    checkEmployeeNames([
      'John',
      'Jane',
      'Emily',
      'Michael',
      'Jessica',
      'David',
      'Laura',
      'Robert',
      'Sarah',
      'James',
    ]);

    cy.get('button').contains('Filters').click();
    cy.get('button').contains('Add filter').click();
    cy.get('button').contains('In Staff').click();

    cy.get('button').contains('Apply').click();

    checkEmployeeNames([
      'John',
      'Emily',
      'Jessica',
      'David',
      'Robert',
      'Sarah',
    ]);

    cy.get('button').contains('Filters (1)').click();
    cy.get('button').contains('Clear').click();

    checkEmployeeNames([
      'John',
      'Jane',
      'Emily',
      'Michael',
      'Jessica',
      'David',
      'Laura',
      'Robert',
      'Sarah',
      'James',
    ]);
  });
});
