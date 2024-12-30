const Validation = (inputs) => {
    let errors = {};

    // Name validation
    if (!inputs.name) {
        errors.name = "El nombre es obligatorio.";
    } else if (inputs.name.length < 3) {
        errors.name = "El nombre debe tener al menos 3 caracteres.";
    }

    // Description validation
    if (!inputs.description) {
        errors.description = "La descripción es obligatoria.";
    } else if (inputs.description.length < 10) {
        errors.description = "La descripción debe tener al menos 10 caracteres.";
    }

    // Stock validation
    if (!inputs.stock) {
        errors.stock = "El stock es obligatorio.";
    } else if (isNaN(inputs.stock) || inputs.stock <= 0) {
        errors.stock = "El stock debe ser un número mayor a 0.";
    }

    // Price validation
    if (!inputs.price) {
        errors.price = "El precio es obligatorio.";
    } else if (isNaN(inputs.price) || inputs.price <= 0) {
        errors.price = "El precio debe ser un número mayor a 0.";
    }

    // Image validation
    if (!inputs.image) {
        errors.image = "La imagen es obligatoria.";
    }

    // Category validation
    if (!inputs.supplie_type) {
        errors.supplie_type = "Debes seleccionar una categoría.";
    }

    return errors;
};

export default Validation;
