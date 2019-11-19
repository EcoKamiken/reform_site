"""
$ cat hoge.txt
question
answer
question
answer
$ python main.py
{
"question":"question",
"answer":"answer",
},
{
"question":"question",
"answer":"answer",
},
"""

filename = 'hoge.txt'

with open(filename, 'r', encoding='utf8') as fp:
    lines = fp.read().splitlines()
    questions = lines[0::2]
    answers = lines[1::2]

    for line in zip(questions, answers):
        print('{')
        print("\"question\":\"{}\",".format(line[0]))
        print("\"answer\":\"{}\"".format(line[1]))
        print('},')
