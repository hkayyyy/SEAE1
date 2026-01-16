import csv

#CSV Validation
def check_csv_structure(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            headers = next(reader)
            
            print(f"Headers found: {headers}")
            print(f"Expected headers: ['id', 'term', 'fullForm', 'category', 'description', 'commonUse']")
            
            #Check if headers match schema
            expected = ['id', 'term', 'fullForm', 'category', 'description', 'commonUse']
            if headers == expected:
                print("CSV structure is correct!")
            else:
                print("CSV structure doesn't match expected format")
                
            #Count rows
            rows = list(reader)
            print(f"\nData stats:")
            print(f"  Total terms: {len(rows)}")
            
            #Count by category
            categories = {}
            for row in rows:
                if len(row) > 3:  #Check row has enough columns
                    category = row[3]
                    categories[category] = categories.get(category, 0) + 1
            
            print(f"\nTerms by category:")
            for category, count in categories.items():
                print(f"  {category}: {count} terms")
                
    except FileNotFoundError:
        print(f"File '{filename}' not found")
    except Exception as e:
        print(f"Error reading file: {e}")



if __name__ == "__main__":
    filename = "BritishRailTerms.csv"
    
    try:
        check_csv_structure(filename)
    except FileNotFoundError:
        print(f"\nFile not found...")
        