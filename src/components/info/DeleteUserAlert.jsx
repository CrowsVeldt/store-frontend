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

export default function DeleteUserAlert(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = useContext(AuthContext);
  const cancelRef = React.useRef();
  const privateAxios = useAxiosPrivate();

  const deleteUser = async () => {
    try {
      const response = await privateAxios.delete(
        `/users/customers/${user?.user?._id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUser(null);
        toast.success(response?.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(err.response?.data.message);
    }
  };

  return (
    <>
      <Button id={props.id} mt={4} colorScheme="red" onClick={onOpen}>
        Delete Account
      </Button>

      {isOpen && (
        <AlertDialog
          id="delete-account-alert"
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay id="delete-account-alert-overlay">
            <AlertDialogContent id="delete-account-alert-content">
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                id="delete-account-alert-header"
              >
                Delete Account
              </AlertDialogHeader>

              <AlertDialogBody id="delete-account-alert-body">
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter id="delete-account-alert-footer">
                <Button
                  ref={cancelRef}
                  onClick={onClose}
                  id="delete-account-alert-cancel"
                >
                  Cancel
                </Button>
                <Button
                  id="delete-account-alert-action"
                  colorScheme="red"
                  onClick={() => {
                    deleteUser(user.email);
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
