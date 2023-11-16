from django.http import JsonResponse
from django.shortcuts import render
from .models import Board
from django.db.models import F

# Create your views here.
def LBdisplay(request):
    Teams = Board.objects.all().order_by('-Points')
    return JsonResponse(list(Board.objects.values()),safe=False)
    return render(request, "leaderboardpage.html", {"Teams":Teams})


def Home(request):
    return render(request, "Home.html")

def Insert(request):
    if request.method=='POST':
        TeamNumber = request.POST['TeamNumber']
        Name = request.POST['Name']
        Points = 0
        Credits = 100

        try:
            obj=Board.objects.get(TeamNumber=TeamNumber)
            print("TEAM NUMBER EXISTS")
        except Board.DoesNotExist:
            ins = Board(TeamNumber=TeamNumber, Name=Name, Points=Points, Credits=Credits)
            ins.save()
    return render(request, "Initial_insert.html")

def disqualify(request):
    if request.method=='POST':
        TeamNumber=request.POST['TeamNumber']
        ins=Board.objects.get(TeamNumber=TeamNumber)
        print(ins)
        ins.delete()
        print("DELETED SUCCESSFULLY")
    return render(request, "disqualify.html")

def Update(request):
    if request.method=='POST':
        TeamNumber=request.POST['TeamNumber']
        Points=request.POST['Points']
        Credits=request.POST['Credits']

        print(TeamNumber,Points,Credits)
        
        ins = Board.objects.get(TeamNumber=TeamNumber)
        if Points[0]=='+':
            ins.Points = F('Points') + int(Points[1:len(Points)])
        elif Points[0]=='-':
            ins.Points = F('Points') - int(Points[1:len(Points)])
        elif Points[0]=='*':
            ins.Points = F('Points') * int(Points[1:len(Points)])
        else:
            print("PLEASE ASSIGN A OPERATOR")

        if Credits[0]=='+':
            ins.Credits = F('Credits') + int(Credits[1:len(Credits)])
        elif Credits[0]=='-':
            ins.Credits = F('Credits') - int(Credits[1:len(Credits)])
        elif Credits[0]=='*':
            ins.Credits = F('Credits') * int(Credits[1:len(Credits)])
        else:
            print("PLEASE ASSIGN A OPERATOR")

        ins.save()

    return render(request, "update.html")