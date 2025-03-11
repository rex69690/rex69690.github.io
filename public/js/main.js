// Main JavaScript file for the Finance Dashboard

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
  // Enable Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Format currency in the DOM
  document.querySelectorAll('.currency').forEach(element => {
    const value = parseFloat(element.textContent);
    if (!isNaN(value)) {
      element.textContent = formatCurrency(value);
    }
  });

  // Format dates in the DOM
  document.querySelectorAll('.date-format').forEach(element => {
    const dateValue = element.textContent;
    if (dateValue) {
      element.textContent = formatDate(dateValue);
    }
  });
}); 