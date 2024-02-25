from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from langchain_core.prompts import PromptTemplate
from langchain_openai.llms import OpenAI

template = """Format the provided resume to this YAML template:
        ---
    name: ''
    phoneNumbers:
    - ''
    websites:
    - ''
    emails:
    - ''
    dateOfBirth: ''
    addresses:
    - street: ''
      city: ''
      state: ''
      zip: ''
      country: ''
    workExperiences:
    - company: ''
      position: ''
      startDate: ''
      endDate: ''
      description: ''
    education:
    - school: ''
      degree: ''
      fieldOfStudy: ''
      startDate: ''
      endDate: ''
    summary: ''
    skills:
    - name: ''
    certifications:
    - name: ''

    {chat_history}
    {human_input}"""


class CV_Parser:

    def __init__(self) -> None:

        prompt = PromptTemplate(
            input_variables=["chat_history", "human_input"], template=template
        )

        memory = ConversationBufferMemory(memory_key="chat_history")

        self.llm_chain = LLMChain(
            llm=OpenAI(model_name="gpt-3.5-turbo-instruct", temperature=0.25),
            prompt=prompt,
            verbose=True,
            memory=memory,
        )

    def predict(self, resume: str) -> str:
        # return "Hello World!"
        res = self.llm_chain.predict(human_input=resume)
        return res
