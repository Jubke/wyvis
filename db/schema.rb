# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150320193638) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "data_types", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "data_types", ["name"], name: "index_data_types_on_name", using: :btree

  create_table "data_types_scenarios", id: false, force: :cascade do |t|
    t.integer "scenario_id",  null: false
    t.integer "data_type_id", null: false
  end

  create_table "data_types_visualization_types", id: false, force: :cascade do |t|
    t.integer "data_type_id",          null: false
    t.integer "visualization_type_id", null: false
  end

  create_table "implementations", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "library_id"
    t.integer  "scenario_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "implementations", ["library_id"], name: "index_implementations_on_library_id", using: :btree
  add_index "implementations", ["scenario_id"], name: "index_implementations_on_scenario_id", using: :btree

  create_table "libraries", force: :cascade do |t|
    t.string   "name",                     null: false
    t.string   "url",                      null: false
    t.string   "url_code"
    t.string   "url_docs"
    t.string   "image_url"
    t.boolean  "web_standard"
    t.string   "render_tech"
    t.string   "dependencies"
    t.string   "license"
    t.string   "support"
    t.string   "current_version"
    t.date     "first_release"
    t.date     "latest_release"
    t.date     "repo_pushed_at"
    t.date     "repo_created_at"
    t.integer  "repo_watchers_count"
    t.integer  "repo_stargazers_count"
    t.integer  "repo_forks_count"
    t.integer  "repo_open_issues"
    t.string   "repo_participation_stats"
    t.string   "meta_tags"
    t.text     "description"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "libraries_visualization_tasks", id: false, force: :cascade do |t|
    t.integer "library_id",            null: false
    t.integer "visualization_task_id", null: false
  end

  create_table "libraries_visualization_types", id: false, force: :cascade do |t|
    t.integer "library_id",            null: false
    t.integer "visualization_type_id", null: false
  end

  create_table "resources", force: :cascade do |t|
    t.string   "url",          null: false
    t.string   "content_type"
    t.integer  "library_id",   null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "resources", ["library_id"], name: "index_resources_on_library_id", using: :btree

  create_table "scenarios", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.text     "short"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "scenarios_visualization_tasks", id: false, force: :cascade do |t|
    t.integer "scenario_id",           null: false
    t.integer "visualization_task_id", null: false
  end

  create_table "scenarios_visualization_types", id: false, force: :cascade do |t|
    t.integer "scenario_id",           null: false
    t.integer "visualization_type_id", null: false
  end

  create_table "visualization_tasks", force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "visualization_types", force: :cascade do |t|
    t.string   "name"
    t.string   "wiki_url"
    t.string   "image_url"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

end
