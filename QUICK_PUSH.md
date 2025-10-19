# Rýchle príkazy pre GitHub Push

Tento súbor obsahuje príkazy na rýchle a efektívne nahratie vašich lokálnych zmien na GitHub.

## Základný postup (3 kroky)

Tieto tri príkazy vykonajte postupne vo vašom termináli v koreňovom adresári projektu.

1.  **Pridať všetky zmeny:**
    Pridá všetky nové a zmenené súbory do "staging area", aby boli pripravené na commit.

    ```bash
    git add .
    ```

2.  **Vytvoriť commit (uložiť zmeny):**
    Uloží pridané zmeny s krátkym popisom toho, čo ste urobili. Nezabudnite zmeniť `"Tvoja správa"` na relevantný popis.

    ```bash
    git commit -m "Tvoja správa"
    ```
    *Príklad:* `git commit -m "Oprava chyby v kontaktnom formulári"`

3.  **Pushnúť zmeny na GitHub:**
    Nahrá vaše uložené zmeny na vzdialený GitHub repozitár.

    ```bash
    git push
    ```

---

## Rýchly postup (1 riadok)

Tento príkaz skombinuje všetky tri kroky do jedného riadku pre maximálnu efektivitu. Stačí zmeniť `"Tvoja správa"`.

```bash
git add . && git commit -m "Tvoja správa" && git push
```

---
