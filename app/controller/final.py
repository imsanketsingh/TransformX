import sys 
import pandas as pd
import json
dataval=sys.argv[1]
data=json.loads(sys.argv[2])
source=dataval
data=data

# data= [
#     {
#         "No.": "1",
#         "Target": " SSN",
#         "Source": " ENUM(region) + \"-\" + .id",
#         "Enumeration": " {\"NA\": \"1\", \"EU\" : \"2\", \"AS\": \"3\", \"AF\": \"4\"}"
#     },
#     {
#         "No.": "2",
#         "Target": " CustomerFullName",
#         "Source": " .firstName + .lastName",
#         "Enumeration": " -"
#     },
#     {
#         "No.": "3",
#         "Target": " CustomerAddress",
#         "Source": " .address.street + .address.suite",
#         "Enumeration": " -"
#     },
#     {
#         "No.": "4",
#         "Target": " CustomerCity",
#         "Source": " .address.city",
#         "Enumeration": " -"
#     },
#     {
#         "No.": "5",
#         "Target": " CustomerZipCode",
#         "Source": " .address.zipcode",
#         "Enumeration": " -"
#     },
#     {
#         "No.": "6",
#         "Target": " CustomerProfession",
#         "Source": " ENUM(.occupation)",
#         "Enumeration": " {\"self-employed\": \"SELF\", \"salaried\": \"FIXED INCOME\", \"other\": \"MISC\"}"
#     },
#     {
#         "No.": "7",
#         "Target": " CustomerAge",
#         "Source": " .age",
#         "Enumeration": " -"
#     },
#     {
#         "No.": "8",
#         "Target": " LoanHistory.item.collateralValue",
#         "Source": " IF(.loanHistory.item.collateral) THEN .loanHistory.item.collateral.estimatedValues ELSE 0",
#         "Enumeration": " -"
#     },
#     {
#         "No.": "9",
#         "Target": " LoanHistory.item.interest",
#         "Source": " ANNUAL_COMPOUND_INTEREST(.loanHistory.item)",
#         "Enumeration": " -"
#     },
#     {
#         "No.": "10",
#         "Target": " TotalAssets",
#         "Source": " .liquid_assets + .non_liquid_assets",
#         "Enumeration": " -"
#     },
#     {
#         "No.": ""
#     }
# ]

li=[]
# for i in range(len(data)-1):
#    data[i]=dict(data[i])
for i in range(len(data)-1):
  l=[data[i]["No."], data[i]["Target"], data[i]["Source"], data[i]["Enumeration"]]
  li.append(l)

df = pd.DataFrame(li, columns =['No.', 'Target', 'Source' ,'Enumeration'])

# source="""
# {
#     "id": "122-34-6543",
#     "region": "NA",
#     "firstName": "Leanne",
#     "lastName": "Graham",
#     "address": {
#         "street": "Kulas Light",
#         "suite": "Apt. 556",
#         "city": "Gwenborough",
#         "zipcode": "92998-3874"
#     },
#     "occupation": "self-employed",
#     "age": 29,
#     "loanHistory": [
#         {
#             "princicpal": 40000,
#             "periodInYears": "3",
#             "rateOfInterest": 10,
#             "collateral": [
#                 {
#                     "assetName": "property",
#                     "estimatedValues": 7000
#                 }
#             ]
#         },
#         {
#             "princicpal": 140000,
#             "periodInYears": "4",
#             "rateOfInterest": 12,
#             "isCommercial": true,
#             "collateral": [
#                 {
#                     "assetName": "condo",
#                     "estimatedValues": 30000
#                 }
#             ]
#         },
#         {
#             "princicpal": 60000,
#             "periodInYears": "4",
#             "rateOfInterest": 12
#         }
#     ],
#     "liquid_assets": 100000,
#     "non_liquid_assets": 300000
# }
# """

source=json.loads(source)

def alreadyInQuotes(mystr):
    if(mystr[0]=='"' and mystr[-1]=='"'):
        return True
    else:
        return False

def findindexes(mystr, mychar):
    return [i for i, ltr in enumerate(mystr) if ltr == mychar]

def getValue(alpha):
    ind = findindexes(alpha, '+')
    mydict={}
    arr = []
    if(len(ind)==0):
        alpha.strip()
        if(alpha[0]=='.'):
            alpha= alpha[1:]
        arr.append(alpha)
        return arr
    lastind= 0
    for item in ind:
        entry = alpha.strip()[lastind:item]
        entry=entry.strip()
        if(alreadyInQuotes(entry)):
            entry= entry[1:-1]
        if(entry[0]=='.'):
            entry= entry[1:]
        arr.append(entry)
        lastind= item+1 

    entry= alpha.strip()[ind[-1]+1:]
    entry=entry.strip()
    if(entry[0]=='.'):
        entry= entry[1:]
    arr.append(entry)
    return arr

mydic= {}
repeatedCount= {}

currDict= {}
currRow= 0
for items in df['Target']:
    items= items.strip()
    currRow+=1
    y = df['Source'][currRow-1]
    y = y.strip()
    tempStr= "NULL"
    if('item' in items):
        ind = items.index('item')
        tempStr= items[:(ind-1)]
        items = tempStr
    if(currDict.get(items)!=None):
        if(repeatedCount.get(items)!=None):
            repeatedCount[items].append(currRow-1)
        else:
            repeatedCount[items]=[currRow-1]
        continue
    currDict[items] = getValue(y)
    
mydic['item']= currDict

enumind={}
index=0
for items in mydic['item']:
    for i in range(len(mydic['item'][items])):
        if 'ENUM' in mydic['item'][items][i]:
            enumind[index]=[i]
            x= mydic['item'][items][i].replace("ENUM", "")
            x=x[1:-1]
            if(x[0]=='.'):
                x=x[1:]
            enumind[index].append(x)
    index+=1

for items in enumind:
    x= enumind[items]
    x[1]= source[x[1]]
    d= json.loads(df['Enumeration'][items])
    x[1]= d[x[1]]
    enumind[items]=x

def findPosTHEN_ELSE(mystr):
    return mystr.find('THEN'), mystr.find("ELSE")

condind={}
index=0
for items in mydic['item']:
    for i in range(len(mydic['item'][items])):
        if 'IF' in mydic['item'][items][i] and 'ELSE' in mydic['item'][items][i]:
            condind[index]=[i]
            posTHEN, posELSE = findPosTHEN_ELSE(mydic['item'][items][i])
            x= mydic['item'][items][i]
            x=x[3:posTHEN]
            x=x.strip()
            x=x[:-1]
            if(x[0]=='.'):
                x=x[1:]
            condind[index].append(x)
            y= mydic['item'][items][i]
            y=y[posTHEN+4:posELSE]
            y=y.strip()
            if(y[0]=='.'):
                y= y[1:]
            condind[index].append(y)
            z= mydic['item'][items][i]
            z=z[posELSE+4:]
            z=z.strip()
            if(z[0]=='.'):
                z= z[1:]
            condind[index].append(z)
    index+=1

count=0
for items in mydic['item']:
  x = mydic['item'][items]
  
  if count in enumind:
      x[enumind[count][0]]=enumind[count][1]
      mydic['item'][items]= x
      for i in range(len(x)):
        if(i!=enumind[count][0]):
          if(source.get(x[i])!=None):
            x[i]=source[x[i]]
      mydic['item'][items]= x
  if count in condind:
    y= condind[count][1:]
    mydic['item'][items]=y
  count+=1

def conversion(li):
    mystr= "["
    for items in li:
        if(alreadyInQuotes(items)):
            mystr+= items
        else:
            mystr+='\"'
            mystr+= items
            mystr+='\"'
        mystr+=','
    mystr=mystr[0:len(mystr)-1]
    mystr+=']'
    return mystr

i=0
detailsInString=""
for items in mydic:
    for each in mydic[items].keys():
        detailsInString+=each
        detailsInString+=":"
        detailsInString+= conversion(mydic['item'][each])
        detailsInString+=","
        i+=1
detailsInString=detailsInString[0:len(detailsInString)-1]

def modifier(key):
  ind= key.find('.')
  key= key[:ind]
  return key

strrun=""
row=0
for j in mydic['item']:
  key=j
  key=key.strip()
  # print(key)
  # break
  if row in enumind:
    x =mydic['item'][key]
    temp=""
    for i in x:
      temp+=i
    strrun+="""
    {
        run:("""+f"{key}"+""")=>{ return \"""" + f"{temp}"+ """\" },
        on:\""""+f"{key}"+"""\"
    },
    """
  elif row in condind:
    if('.' in key):
      key = modifier(key)
    # print(key)
    x =mydic['item'][key]
    temp=""
    for i in x:
      temp=temp+i+","
    temp+="condition"
    strrun+="""
    {
        run:("""+f"{key}"+""")=>{ return \"""" + f"{temp}"+ """\" },
        on:\""""+f"{key}"+"""\"
    },
    """
  else:
    temp=""
    x =mydic['item'][key]
    for i in range(len(x)):
      if i==len(x)-1:
        temp+=key + "[" + f"{i}" +"]"
      else:
        temp+=key + "[" + f"{i}" +"]+ \" \" +"
    strrun+="""
    {
        run:("""+f"{key}"+""")=>{ return """ + f"{temp}"+ """ },
        on:\""""+f"{key}"+"""\"
    },
    """
  row+=1

newStr= detailsInString
newStr="""{
  "item": {
    """+newStr+"""},""" +"""
    "operate":["""+strrun+"""]}"""

print(newStr)
