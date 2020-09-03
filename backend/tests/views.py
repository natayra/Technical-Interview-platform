from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from tests.helpers import *
from tests.tape_tests import *


class GetCandidateCodeView(GenericAPIView):
    """
    post:
    Retrieves the code written by a candidate for a specified question
    """
    def post(self, request):
        num = request.data['question_id']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        candidate_id = request.data['candidate_id']
        try:
            data = read_the_candidate_code(num, candidate_id, first_name, last_name)
        except FileNotFoundError:
            return Response(data="No Code to Display")
        return Response(data=data)


class RunTestOne(GenericAPIView):
    """
    post:
    Runs test for "Sum of Two Numbers" Question
    """
    permission_classes = [IsAuthenticated]
    tape_one = question_one_tapes["one"]
    tape_two = question_one_tapes["two"]
    tape_three = question_one_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 1

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestTwo(GenericAPIView):
    """
    post:
    Runs test for "Reverse a String" Question
    """
    permission_classes = [IsAuthenticated]
    tape_one = question_two_tapes["one"]
    tape_two = question_two_tapes["two"]
    tape_three = question_two_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 2

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestThree(GenericAPIView):
    """
    post:
    Runs test for "First Element of an Array" Question
    """
    permission_classes = [IsAuthenticated]
    tape_one = question_three_tapes["one"]
    tape_two = question_three_tapes["two"]
    tape_three = question_three_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 3

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestFour(GenericAPIView):
    """
    post:
    Runs test for "Less Than or Equal to Zero" Question
    """
    permission_classes = [IsAuthenticated]
    tape_one = question_four_tapes["one"]
    tape_two = question_four_tapes["two"]
    tape_three = question_four_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 4

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestFive(GenericAPIView):
    """
    post:
    Runs test for "Next Number" Question
    """
    permission_classes = [IsAuthenticated]
    tape_one = question_five_tapes["one"]
    tape_two = question_five_tapes["two"]
    tape_three = question_five_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 5

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestSix(GenericAPIView):
    """
    post:
    Runs test for "Add Up to a Number" Question
    """
    permission_classes = [IsAuthenticated]
    tape_one = question_six_tapes["one"]
    tape_two = question_six_tapes["two"]
    tape_three = question_six_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 6

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestSeven(GenericAPIView):
    """
    post:
    Runs test for "Count the Vowels" Question
    """
    permission_classes = [IsAuthenticated]
    tape_one = question_seven_tapes["one"]
    tape_two = question_seven_tapes["two"]
    tape_three = question_seven_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 7

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestEight(GenericAPIView):
    """
    post:
    Runs test for "Min Max Number" Question
    """
    permission_classes = [IsAuthenticated]
    tape_one = question_eight_tapes["one"]
    tape_two = question_eight_tapes["two"]
    tape_three = question_eight_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 8

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestNine(GenericAPIView):
    """
    post:
    Runs test for "Count the Characters" Question
    """
    permission_classes = [IsAuthenticated]
    tape_one = question_nine_tapes["one"]
    tape_two = question_nine_tapes["two"]
    tape_three = question_nine_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 9

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestTen(GenericAPIView):
    """
    post:
    Runs test for "Multiply All the Numbers" Question
    """
    permission_classes = [IsAuthenticated]
    tape_one = question_ten_tapes["one"]
    tape_two = question_ten_tapes["two"]
    tape_three = question_ten_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 10

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)
