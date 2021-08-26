import React, { useState } from 'react';

import { Button, Stack, Text } from '@chakra-ui/react';

import Popup from 'reactjs-popup';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import file from '../../assets/terms.pdf';

const TermsPopup = ({ acceptTerms, closePopup, isPopupVisible, onCancel }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <Popup open={isPopupVisible} onClose={closePopup}>
      <Stack
        backgroundColor="gray.200"
        maxHeight="100vh"
        maxWidth="100vw"
        overflowX="scroll"
        overflowY="scroll"
        padding={5}
      >
        <Stack>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </Stack>

        <Text fontSize="0.7rem" textAlign="center">
          Page {pageNumber} of {numPages}
        </Text>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" justifyContent="center">
            {pageNumber > 1 && (
              <Button size="xs" onClick={handlePrevPage}>
                Prev
              </Button>
            )}
            {pageNumber < numPages && (
              <Button size="xs" onClick={handleNextPage}>
                Next
              </Button>
            )}
          </Stack>

          <Stack direction="row">
            <Button size="xs" onClick={acceptTerms}>
              Accept
            </Button>
            <Button marginBottom={5} size="xs" onClick={onCancel}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Popup>
  );
};

export default TermsPopup;
