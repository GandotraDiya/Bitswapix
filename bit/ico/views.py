
from django.shortcuts import render
from .forms import NewsletterForm, PurchaseForm
from .models import Subscriber
from datetime import datetime, timedelta

def home(request):
    newsletter_form = NewsletterForm()
    purchase_form = PurchaseForm()
    message = ""

    # Promo bonuses
    promo_bonus_map = {
        "BONUS10": 1.10,
        "BONUS20": 1.20
    }

    # Handle POST request
    if request.method == "POST":
        if 'email' in request.POST:
            newsletter_form = NewsletterForm(request.POST)
            if newsletter_form.is_valid():
                email = newsletter_form.cleaned_data['email']
                if not Subscriber.objects.filter(email=email).exists():
                    Subscriber.objects.create(email=email)
                    message = "Successfully subscribed!"
                else:
                    message = "You are already subscribed."

        elif 'amount' in request.POST:
            purchase_form = PurchaseForm(request.POST)
            if purchase_form.is_valid():
                amount = purchase_form.cleaned_data['amount']
                crypto = purchase_form.cleaned_data['crypto']
                promo = purchase_form.cleaned_data['promo_code']

                bonus_multiplier = promo_bonus_map.get(promo.upper(), 1.00)

                if crypto == "USDT":
                    tokens = amount * 96
                elif crypto == "ETH":
                    tokens = amount * 171850
                elif crypto == "BTC":
                    tokens = amount * 23
                else:
                    tokens = 0

                tokens *= bonus_multiplier
                after_presale_value = tokens * 0.05

                print(f"Tokens: {tokens}, Bonus: {bonus_multiplier}, Value after presale: ${after_presale_value}")

    # Countdown logic
    countdown_deadline = datetime.now() + timedelta(days=3)

    # Token sale progress data
    total_raised = 3665523.06
    target = 4600000
    stage = "13"
    price = "0.01045455"
    percent_filled = (total_raised / target) * 100

    context = {
        'form': newsletter_form,
        'purchase_form': purchase_form,
        'message': message,
        'deadline': countdown_deadline.isoformat(),
        'total_raised': total_raised,
        'target': target,
        'stage': stage,
        'price': price,
        'percent_filled': percent_filled,
    }

    if 'tokens' in locals() and 'after_presale_value' in locals():
        bonus_tokens = (bonus_multiplier - 1.0) * (tokens / bonus_multiplier)

        context['calculated_tokens'] = round(tokens, 2)
        context['after_presale_value'] = round(after_presale_value, 2)
        context['bonus_applied'] = round((bonus_multiplier - 1) * 100)

    return render(request, 'ico/home.html', context)
