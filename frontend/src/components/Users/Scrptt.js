

// $(function () {
//   $("#example1").DataTable({
//     "responsive": true, "lengthChange": false, "autoWidth": false,
//     "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],

//   }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

// });


$(function () {
  var table = $('#example').DataTable({
    columnDefs: [
      {
        targets: 2,
        visible: false,
        searchable: false
      },
      {
        targets: 3,
        visible: false
      }
    ],
    footerCallback: function (row, data, start, end, display) {
      let api = this.api();

      // Remove the formatting to get integer data for summation
      let intVal = function (i) {
        return typeof i === 'string'
          ? i.replace(/[\$,]/g, '') * 1
          : typeof i === 'number'
            ? i
            : 0;
      };

      // Total over all pages for Age column
      let totalAge = api
        .column(3)
        .data()
        .reduce((a, b) => intVal(a) + intVal(b), 0);

      // Total over this page for Age column
      let pageTotalAge = api
        .column(3, { page: 'current' })
        .data()
        .reduce((a, b) => intVal(a) + intVal(b), 0);

      // Update footer for Age column
      $(api.column(3).footer()).html(
        pageTotalAge + ' ( ' + totalAge + ' total)'
      );

      // Total over all pages for Salary column
      let totalSalary = api
        .column(5)
        .data()
        .reduce((a, b) => intVal(a) + intVal(b), 0);

      // Total over this page for Salary column
      let pageTotalSalary = api
        .column(5, { page: 'current' })
        .data()
        .reduce((a, b) => intVal(a) + intVal(b), 0);

      // Update footer for Salary column
      $(api.column(5).footer()).html(
        '$' + pageTotalSalary + ' ( $' + totalSalary + ' total)'
      );
    },
    initComplete: function () {
      var api = this.api(); // Get DataTables API directly here

      // Add select tag for "Position" column below its header
      api.columns([1]).every(function () {
        let column = this;

        // Create select element
        let select = document.createElement('select');
        select.add(new Option(''));

        // Append select tag below column header
        $(select).appendTo($(column.header())).on('change', function () {
          column
            .search($(this).val(), { exact: true })
            .draw();
        });

        // Add list of options
        column
          .data()
          .unique()
          .sort()
          .each(function (d, j) {
            select.add(new Option(d));
          });
      });

      // Add search inputs below respective column headers for "Name" and "Office" columns
      api.columns([0, 2]).every(function () {
        let column = this;
        let title = $(column.header()).text();

        // Create input element
        let input = document.createElement('input');
        input.placeholder = title;

        // Append input below column header
        $(input).appendTo($(column.header())).on('keyup change', function () {
          if (column.search() !== this.value) {
            column.search(this.value).draw();
          }
        });
      });
    }
  });

  // Custom range filtering function for age
  $.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
      var minAge = parseInt($('#minAge').val(), 10);
      var maxAge = parseInt($('#maxAge').val(), 10);
      var age = parseFloat(data[3]) || 0;

      if ((isNaN(minAge) && isNaN(maxAge)) ||
        (isNaN(minAge) && age <= maxAge) ||
        (minAge <= age && isNaN(maxAge)) ||
        (minAge <= age && age <= maxAge)) {
        return true;
      }
      return false;
    }
  );

  // Custom range filtering function for salary
  $.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
      var minSalary = parseInt($('#minSalary').val(), 10);
      var maxSalary = parseInt($('#maxSalary').val(), 10);
      var salary = parseFloat(data[5].replace(/[\$,]/g, '')) || 0;

      if ((isNaN(minSalary) && isNaN(maxSalary)) ||
        (isNaN(minSalary) && salary <= maxSalary) ||
        (minSalary <= salary && isNaN(maxSalary)) ||
        (minSalary <= salary && salary <= maxSalary)) {
        return true;
      }
      return false;
    }
  );

  // Custom range filtering function for start date
  $.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
      var minDate = new Date($('#startDate').val());
      var maxDate = new Date($('#endDate').val());
      var startDate = new Date(data[4]);

      if ((isNaN(minDate) && isNaN(maxDate)) ||
        (isNaN(minDate) && startDate <= maxDate) ||
        (minDate <= startDate && isNaN(maxDate)) ||
        (minDate <= startDate && startDate <= maxDate)) {
        return true;
      }
      return false;
    }
  );

  // Function to update dropdown colors based on visibility
  function updateDropdownColors() {
    $('#columnToggle option').each(function () {
      var column = table.column($(this).val());
      if (column.visible()) {
        $(this).addClass('visible-column').removeClass('hidden-column');
      } else {
        $(this).addClass('hidden-column').removeClass('visible-column');
      }
    });
  }

  // Initial update of dropdown colors
  updateDropdownColors();

  $('#columnToggle').on('change', function () {
    var column = table.column($(this).val());
    column.visible(!column.visible());
    updateDropdownColors();
  });

  // Trigger table redraw on input changes
  $('#minAge, #maxAge, #minSalary, #maxSalary, #startDate, #endDate').on('input change', function () {
    table.draw();
  });
});