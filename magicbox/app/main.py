from fastapi import FastAPI, File, UploadFile

from app.parser.cv_parser import CV_Parser
from app.parser.pdf_parser import PDF_Parser

app = FastAPI()
pdf_parser = PDF_Parser()
cv_parser = CV_Parser()


@app.post("/parse_cv/")
async def create_upload_file(file: UploadFile = File(...)):
    print(
        {
            "filename": file.filename,
            "content_type": file.content_type,
            "file": file.file,
        }
    )
    contents = await file.read()
    with open(file.filename, "wb") as f:
        f.write(contents)

    pdf = await pdf_parser.extract_text_from_binary(file.filename, is_local_file=True)
    # print(pdf)
    prediction = cv_parser.predict(pdf)
    print(prediction)
    return {"Hello": "World", prediction: prediction}


@app.get("/items")
def read_item():
    return {"item_id": "item_id"}
