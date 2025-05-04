from django import forms
# forms.py
from django import forms

class PurchaseForm(forms.Form):
    amount = forms.DecimalField(widget=forms.NumberInput(attrs={'id': 'id_amount'}))
    crypto = forms.ChoiceField(
        choices=[('USDT', 'USDT'), ('ETH', 'ETH'), ('BTC', 'BTC')],
        widget=forms.Select(attrs={'id': 'id_crypto'})
    )

# CRYPTO_CHOICES = [
#     ('USDT', 'USDT'),
#     ('ETH', 'ETH'),
#     ('BTC', 'BTC'),
# ]

# class PurchaseForm(forms.Form):
#     amount = forms.DecimalField(label="Amount", min_value=0, decimal_places=2, required=True)
#     crypto = forms.ChoiceField(label="Crypto", choices=CRYPTO_CHOICES)
#     promo_code = forms.CharField(label="Promo Code", required=False, max_length=20)

class NewsletterForm(forms.Form):
    email = forms.EmailField(
        label="",
        widget=forms.EmailInput(attrs={
            'placeholder': 'Enter your email address',
            'class': 'form-input'
        })
    )



