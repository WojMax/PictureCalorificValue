def calculate_caloric_demand(user_data):
    caloric_demand = -1
    ##BMR is calculated based on Mifflin-St Jeor formula:
    ##BMR x PAL - difference(goal)
    if '[null]' not in user_data:
        for values in user_data:
            if values[0] == 'female':
                BMRxPAL = ((9.99 * values[3]) + (6.25 * values[2]) - (4.92 * values[1]) - 161) * values[4]
            else:
                BMRxPAL = ((9.99 * values[3]) + (6.25 * values[2]) - (4.92 * values[1]) + 5) * values[4]

            difference = values[5] * 100

            if values[6] >= values[3]:
                caloric_demand = BMRxPAL + difference
            else:
                caloric_demand = BMRxPAL - difference

    return caloric_demand
