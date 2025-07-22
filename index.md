---
title: 'Online Courses from Arm Education'
filter: course
layout: article
publication-date: 2025-07-21
---

<p>
  These freely accessible courses help students, hobbyists, and engineers learn key hardware and software design principles using Arm-based platforms. Many are available on <strong>edX</strong> or <strong>Coursera</strong>.
</p>


<!-- Grid Container -->
{% assign items = site.data.courseInformation.courses %}

<div class="course-grid" id="course-grid">
  {% for course in items %}
    <div class="course-card" 
    data-keywords="{{ course.subjects | join: ' ' }} {{ course.platform | join: ' ' }} {{ course['sw-hw'] | join: ' ' }} {{ course.level | join: ' ' }} {{ course.publisher | join: ' ' }}"
          data-title="{{ course.title | downcase | escape }}"
         data-description="{{ course.description | strip_html | downcase | escape }}">
    
      <h3>{{ course.title }}</h3>

      {% if course.url %}
        {% if course.url contains "http" and course.url contains "[" %}
        {% elsif course.url.size > 0 and course.url[0] contains "http" %}
          {% for link in course.url %}
            <a class="button" href="{{ link }}" target="_blank">
              Access via {{ link | split: '.' | slice: 1, 1 | first | capitalize }}
            </a>
          {% endfor %}
        {% else %}
          <a class="button" href="{{ course.url }}" target="_blank">
            Access via {{ course.url | split: '.' | slice: 1, 1 | first | capitalize }}
          </a>
        {% endif %}
      {% endif %}
    </div>
  {% endfor %}
</div>
