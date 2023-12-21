
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AuthContext } from "../../context/AuthContext";

export default function DeleteProductAlert({productId}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const privateAxios = useAxiosPrivate();

  const deleteProduct = async () => {
    try {
      const response = await privateAxios.delete(
        `/products/admin/${productId}/delete`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        //TODO: reload all products
        toast.success(response?.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(err.response?.data.message);
    }
  };

  return (
    <>
      <Button id={`delete-product-button-${productId}`} mt={4} colorScheme="red" onClick={onOpen} size={"xs"}>
        Delete Product
      </Button>

      {isOpen && (
        <AlertDialog
          id="delete-product-alert"
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay id="delete-product-alert-overlay">
            <AlertDialogContent id="delete-product-alert-content">
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                id="delete-product-alert-header"
              >
                Delete Product
              </AlertDialogHeader>

              <AlertDialogBody id="delete-product-alert-body">
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter id="delete-product-alert-footer">
                <Button
                  ref={cancelRef}
                  onClick={onClose}
                  id="delete-product-alert-cancel"
                >
                  Cancel
                </Button>
                <Button
                  id="delete-product-alert-action"
                  colorScheme="red"
                  onClick={() => {
                    deleteProduct(productId)
                    onClose();
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  );
}
