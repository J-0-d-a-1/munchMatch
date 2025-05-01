import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationModal = ({
  show,
  onHide,
  onConfirm,
  restaurantName,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete <strong>{restaurantName} </strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
