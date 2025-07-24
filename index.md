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
{% assign grouped = items | group_by_exp: "course", "course.publisher | join: ', '" %}

<!-- Render Arm Education courses first (ungrouped) -->
<div class="course-grid" id="course-grid">
  {% for group in grouped %}
    {% assign publisher_name = group.name | strip %}

    {% if publisher_name contains "Arm Education" %}
      {% for course in group.items %}
        <div class="course-card"
          data-keywords="{{ course.subjects | join: ' ' }} {{ course.platform | join: ' ' }} {{ course['sw-hw'] | join: ' ' }} {{ course.level | join: ' ' }} {{ course.publisher | join: ' ' }}"
          data-title="{{ course.title | downcase | escape }}"
          data-description="{{ course.description | strip_html | downcase | escape }}">

          <h3 class="course-title">{{ course.title }}</h3>

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
    {% endif %}
  {% endfor %}
</div>

<div class="course-grid" id="course-grid">
<!-- Render all other publishers with section titles -->
{% for group in grouped %}
  {% assign publisher_name = group.name | strip %}

  {% unless publisher_name contains "Arm Education" %}
    <div class="course-section">
      <h2 class="section-title">Courses from {{ publisher_name }}</h2>
      <div class="course-grid">
        {% for course in group.items %}
          <div class="course-card"
            data-keywords="{{ course.subjects | join: ' ' }} {{ course.platform | join: ' ' }} {{ course['sw-hw'] | join: ' ' }} {{ course.level | join: ' ' }} {{ course.publisher | join: ' ' }}"
            data-title="{{ course.title | downcase | escape }}"
            data-description="{{ course.description | strip_html | downcase | escape }}">

            <h3 class="course-title">{{ course.title }}</h3>

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
    </div>
  {% endunless %}
{% endfor %}
</div>


<!-- No Results Message -->
<div id="no-results" style="display: none; text-align: center; margin-top: 2rem; color: #666;">
  <p><strong>No results found.</strong><br>Try adjusting your filters or search terms.</p>
</div>
