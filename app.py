from flask import Flask, render_template, request, redirect, url_for
import os
from datetime import date

app = Flask(__name__)

# Forum posts
posts = [
    {"id": 1, "author": "Iskandar", "course": "Engineering Math 1", "time": "2 hours ago", "text": "Can someone explain how to solve integration by u-sub?", "likes": 5, "comments": 1, "color": "blue"},
    {"id": 2, "author": "Sinclair", "course": "Electrical system", "time": "5 hours ago", "text": "How do i use mesh analysis with capcitors involved?", "likes": 8, "comments": 1, "color": "purple"},
    {"id": 3, "author": "John Engineering", "course": "Engineering", "time": "1 day ago", "text": "I don't need help, I'm just here to brag?", "likes": 67, "comments": 0, "color": "pink"}
]

# Calendar events
events = [
    {"id": 1, "title": "Office Hours - Prof. Lim", "datetime": "Jan 27 at 15:00", "location": "E2-07-12", "shared_by": "You"}
]

# Notes
notes = [
    {"id": 1, "title": "Integration Formulas", "course": "Engineering Math 1", "content": "∫x^n dx = (x^(n+1))/(n+1) + C\n∫e^x dx = e^x + C\n∫(1/x) dx = ln|x| + C", "date": "Jan 25, 2026", "color": "yellow"},
    {"id": 2, "title": "O Notation", "course": "Data Structure", "content": "Arrays: O(1) access, O(n) insertion\nLinked Lists: O(n) access, O(1) insertion\nHash Tables: O(1) average for search/insert", "date": "Jan 26, 2026", "color": "blue"},
    {"id": 3, "title": "John here again", "course": "Engineering", "content": "I AM GOATED AT ENGINEERING HAHAHAHA", "date": "Jan 20, 2026", "color": "green"}
]

@app.route("/", methods=["GET", "POST"])
def forum():
    if request.method == "POST":
        author = request.form.get("author") or "Anonymous"
        course = request.form.get("course") or "General"
        text = request.form.get("text") or ""
        if text.strip():
            new_id = max(p["id"] for p in posts) + 1 if posts else 1
            posts.insert(0, {
                "id": new_id,
                "author": author,
                "course": course,
                "time": "Just now",
                "text": text,
                "likes": 0,
                "comments": 0,
                "color": "blue"
            })
        return redirect(url_for("forum"))
    return render_template("forum.html", posts=posts)

@app.route("/like/<int:post_id>", methods=["POST"])
def like(post_id):
    for p in posts:
        if p["id"] == post_id:
            p["likes"] += 1
            break
    return ("", 204)

@app.route("/calendar", methods=["GET", "POST"])
def calendar():
    if request.method == "POST":
        title = request.form.get("title") or "Untitled Event"
        dt = request.form.get("datetime") or "TBA"
        loc = request.form.get("location") or "TBA"
        new_id = max(e["id"] for e in events) + 1 if events else 1
        events.append({"id": new_id, "title": title, "datetime": dt, "location": loc, "shared_by": "You"})
        return redirect(url_for("calendar"))
    today = date.today()
    return render_template("calendar.html", events=events, today=today)

@app.route("/notes", methods=["GET", "POST"])
def notes_page():
    if request.method == "POST":
        title = request.form.get("title") or "Untitled Note"
        course = request.form.get("course") or "General"
        content = request.form.get("content") or ""
        color = request.form.get("color") or "yellow"
        new_id = max(n["id"] for n in notes) + 1 if notes else 1
        notes.insert(0, {"id": new_id, "title": title, "course": course, "content": content, "date": date.today().strftime("%b %d, %Y"), "color": color})
        return redirect(url_for("notes_page"))
    return render_template("notes.html", notes=notes)
    
@app.route('/lms')
def lms():
    return '<a href="https://xsite.singaporetech.edu.sg/d2l/loginh/?target=/d2l/home/167602" target="_blank">SIT xSiTe LMS</a>'

@app.route('/health')
def health():
    return 'OK', 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))










