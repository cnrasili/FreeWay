const VALID_TYPES = ['metro', 'tram', 'metrobus', 'marmaray', 'funicular', 'cablecar'];
const HEX_REGEX = /^#([0-9A-Fa-f]{6})$/;

// Validates line input for create operations
function validateCreateLine(data) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('name is required and must be at least 2 characters.');
  }

  if (!data.type || !VALID_TYPES.includes(data.type)) {
    errors.push(`type is required and must be one of: ${VALID_TYPES.join(', ')}.`);
  }

  if (data.color && !HEX_REGEX.test(data.color)) {
    errors.push('color must be a valid hex code (#RRGGBB).');
  }

  if (data.is_active !== undefined && data.is_active !== 0 && data.is_active !== 1) {
    errors.push('is_active must be 0 or 1.');
  }

  return errors;
}

// Validates line input for update operations
function validateUpdateLine(data) {
  const errors = [];

  if (data.name !== undefined) {
    if (typeof data.name !== 'string' || data.name.trim().length < 2) {
      errors.push('name must be at least 2 characters.');
    }
  }

  if (data.type !== undefined && !VALID_TYPES.includes(data.type)) {
    errors.push(`type must be one of: ${VALID_TYPES.join(', ')}.`);
  }

  if (data.color !== undefined && !HEX_REGEX.test(data.color)) {
    errors.push('color must be a valid hex code (#RRGGBB).');
  }

  if (data.is_active !== undefined && data.is_active !== 0 && data.is_active !== 1) {
    errors.push('is_active must be 0 or 1.');
  }

  return errors;
}

module.exports = { validateCreateLine, validateUpdateLine };
