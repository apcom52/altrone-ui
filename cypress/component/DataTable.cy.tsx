import { ReactNode } from 'react';
import { Application, DataTable } from '../../src';
import { DataTableColumn } from '../../src/components/dataTable/DataTable.types';

type Person = {
  id: number;
  name: string;
  role: string;
  age: number;
  active: boolean;
  hiredAt: string;
};

const PEOPLE: Person[] = [
  { id: 1, name: 'Ada', role: 'Engineer', age: 36, active: true, hiredAt: '2019-06-10' },
  { id: 2, name: 'Alan', role: 'Engineer', age: 41, active: true, hiredAt: '2020-02-01' },
  { id: 3, name: 'Grace', role: 'Manager', age: 52, active: false, hiredAt: '2021-11-20' },
  { id: 4, name: 'Katherine', role: 'Analyst', age: 47, active: true, hiredAt: '2022-05-15' },
  { id: 5, name: 'Edsger', role: 'Engineer', age: 58, active: true, hiredAt: '2018-01-30' },
  { id: 6, name: 'Barbara', role: 'Manager', age: 49, active: true, hiredAt: '2017-04-19' },
  { id: 7, name: 'Donald', role: 'Analyst', age: 63, active: false, hiredAt: '2014-02-28' },
];

const COLUMNS: DataTableColumn<Person>[] = [
  { accessor: 'name', label: 'Name', sortable: true, filterable: true },
  { accessor: 'role', label: 'Role', type: 'select', filterable: true },
  { accessor: 'age', label: 'Age', type: 'number', sortable: true, filterable: true, width: 100 },
  { accessor: 'active', label: 'Active', type: 'boolean', filterable: true, width: 90 },
  { accessor: 'hiredAt', label: 'Hired', type: 'date', filterable: true, width: 140 },
];

const mount = (ui: ReactNode) =>
  cy.mount(
    <Application config={{ locale: { locale: 'en-US' } }}>
      {ui}
    </Application>,
  );

const rows = () => cy.get('[data-selected]');

describe('DataTable.cy.tsx', () => {
  it('paginates to rowsPerPage', () => {
    mount(<DataTable data={PEOPLE} columns={COLUMNS} rowsPerPage={4} />);
    rows().should('have.length', 4);
  });

  it('sorts by a column header (none → desc → asc)', () => {
    mount(<DataTable data={PEOPLE} columns={COLUMNS} rowsPerPage={7} />);

    cy.get('[title="age"]').click();
    rows().first().should('contain.text', 'Donald'); // age 63

    cy.get('[title="age"]').click();
    rows().first().should('contain.text', 'Ada'); // age 36
  });

  it('seeds sort state from defaultSort', () => {
    mount(
      <DataTable
        data={PEOPLE}
        columns={COLUMNS}
        rowsPerPage={7}
        defaultSort={{ field: 'age', direction: 'asc' }}
      />,
    );
    rows().first().should('contain.text', 'Ada');
  });

  it('adds and applies a filter, narrowing the rows', () => {
    mount(<DataTable data={PEOPLE} columns={COLUMNS} rowsPerPage={7} />);

    rows().should('have.length', 7);

    cy.get('button').contains('Filters').click();
    cy.get('button').contains('Add filter').click();
    cy.get('button').contains('Age').click();

    // default number rule is "equals to"
    cy.get('[data-filter-name="age"][data-filter-control="true"]')
      .find('input')
      .first()
      .type('41');
    cy.get('button').contains('Apply').click();

    rows().should('have.length', 1);
    rows().first().should('contain.text', 'Alan');
    cy.get('button').contains('Filters (1)').should('exist');
  });

  it('reveals a checkbox column after entering select mode', () => {
    mount(<DataTable data={PEOPLE} columns={COLUMNS} rowsPerPage={7} selectable />);

    cy.get('input[type="checkbox"]').should('not.exist');
    cy.get('[title="Select rows"]').click();
    cy.get('input[type="checkbox"]').should('have.length.greaterThan', 0);
  });

  it('renders collapsed row actions behind an overflow menu', () => {
    mount(
      <DataTable
        data={PEOPLE}
        columns={COLUMNS}
        rowsPerPage={3}
        renderRowActions={() => (
          <DataTable.RowActions>
            <DataTable.RowAction label="Edit" onClick={() => undefined} />
            <DataTable.RowAction
              label="Delete"
              collapsed
              danger
              onClick={() => undefined}
            />
          </DataTable.RowActions>
        )}
      />,
    );

    cy.get('[data-selected]').first().contains('button', 'Edit').should('be.visible');
    cy.get('[data-selected]').first().contains('Delete').should('not.exist');
  });

  it('shows an empty banner when there is no data', () => {
    mount(<DataTable data={[]} columns={COLUMNS} />);
    cy.contains('No data').should('be.visible');
  });

  it('renders skeletons in loading mode', () => {
    mount(<DataTable data={PEOPLE} columns={COLUMNS} mode="loading" rowsPerPage={4} />);
    cy.get('[class*="Skeleton"]').should('have.length.greaterThan', 0);
  });

  it('resizes a column by dragging its header handle', () => {
    mount(
      <DataTable
        data={PEOPLE}
        columns={COLUMNS}
        rowsPerPage={4}
        resizableColumns
      />,
    );

    cy.get('[title="age"]').then(($header) => {
      const before = $header[0].getBoundingClientRect().width;

      cy.get('[data-resize-handle="age"]').trigger('mousedown', { button: 0 });
      cy.get('body').trigger('mousemove', { clientX: 800 });
      cy.get('body').trigger('mouseup');

      cy.get('[title="age"]').should(($after) => {
        expect($after[0].getBoundingClientRect().width).to.not.equal(before);
      });
    });
  });
});
