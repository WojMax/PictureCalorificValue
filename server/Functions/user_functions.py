def calculate_caloric_demand(user_data):
    caloric_demand = -1

    if '[null]' not in user_data:
        for values in user_data:
            if values[0] == 'female':
                caloric_demand = (655.1 + (9.563 * values[3]) + (1.850 * values[2]) - (4.676 * values[1])) * values[4]
            elif values[0] == 'male':
                caloric_demand = (66.47 + (13.75 * values[3]) + (5.003 * values[2]) - (6.755 * values[1])) * values[4]

    return caloric_demand
