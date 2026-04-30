// Validates station input for create operations
function validateCreateStation(data) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('name is required and must be at least 2 characters.');
  }

  if (data.line_id === undefined || !Number.isInteger(Number(data.line_id)) || Number(data.line_id) < 1) {
    errors.push('line_id is required and must be a positive integer.');
  }

  if (data.order_number === undefined || !Number.isInteger(Number(data.order_number)) || Number(data.order_number) < 1) {
    errors.push('order_number is required and must be a positive integer.');
  }

  return errors;
}

// Validates station input for update operations
function validateUpdateStation(data) {
  const errors = [];

  if (data.name !== undefined) {
    if (typeof data.name !== 'string' || data.name.trim().length < 2) {
      errors.push('name must be at least 2 characters.');
    }
  }

  if (data.line_id !== undefined) {
    if (!Number.isInteger(Number(data.line_id)) || Number(data.line_id) < 1) {
      errors.push('line_id must be a positive integer.');
    }
  }

  if (data.order_number !== undefined) {
    if (!Number.isInteger(Number(data.order_number)) || Number(data.order_number) < 1) {
      errors.push('order_number must be a positive integer.');
    }
  }

  return errors;
}

module.exports = { validateCreateStation, validateUpdateStation };
