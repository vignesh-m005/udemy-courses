list1 = ["1", "-", "-"]
list2 = ["4", "-", "-"]
list3 = ["7", "-", "-"]

is_win = False

print("Enter player 1's name:")
player1 = input()
print("Enter player 2's name:")
player2 = input()
turn = player1
filled = []


def update_list(index, mark):
    if index < 4:
        list1[index - 1] = mark
    elif index > 6:
        list3[(index - 1) % 3] = mark
    else:
        list2[(index - 1) % 3] = mark


def display(lines):
    line = ""
    for item in lines:
        line += item + " "
    print(line)


def change_player():
    global turn
    if turn == player1:
        turn = player2
    else:
        turn = player1


def check_for_win():
    if len(set(list1)) == 1:
        return True
    elif len(set(list2)) == 1:
        return True
    elif len(set(list3)) == 1:
        return True

    if len({list1[0], list2[1], list3[2]}) == 1:
        return True
    if len({list1[2], list2[1], list3[0]}) == 1:
        return True

    for i in range(0, 3):
        if len({list1[i], list2[i], list3[i]}) == 1:
            return True

    return False


display(list1)
display(list2)
display(list3)
while not is_win:
    if len(filled) == 9:
        print("Match draw!!!")
        is_win = True
        continue
    print(turn + "'s turn(" + ("X" if turn == player1 else "O") + ")")
    print("Where you want to mark: ")
    try:
        place = int(input())
    except ValueError:
        print("Enter a valid number: ")
        continue
    if place > 9 or place < 1:
        print("Enter between 1 to 9")
        continue
    if place in filled:
        print("The location is already occupied!! Enter valid place:")
        continue

    filled.append(place)
    update_list(place, "X" if turn == player1 else "O")
    if len(filled) > 4:
        is_win = check_for_win()
    display(list1)
    display(list2)
    display(list3)

    if is_win:
        print(turn + " has WON the match!!")
        continue
    change_player()
