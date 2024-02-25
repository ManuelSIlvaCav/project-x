import io

import requests
from PyPDF2 import PdfReader


class PDF_Parser:

    async def extract_text_from_binary(self, pdf_source, is_local_file=False) -> str:
        file = (
            io.BytesIO(requests.get(pdf_source).content)
            if not is_local_file
            else open(pdf_source, "rb")
        )

        pdf_reader = PdfReader(file)
        num_pages = len(pdf_reader.pages)
        text = ""

        for page in range(num_pages):
            text += pdf_reader.pages[page].extract_text()

        if is_local_file:
            file.close()

        return text
