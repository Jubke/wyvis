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

ActiveRecord::Schema.define(version: 20150203160026) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "implementations", force: :cascade do |t|
    t.string   "name"
    t.string   "author"
    t.text     "description"
    t.integer  "library_id"
    t.integer  "usecase_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "javascript_file_name"
    t.string   "javascript_content_type"
    t.integer  "javascript_file_size"
    t.datetime "javascript_updated_at"
    t.string   "stylesheet_file_name"
    t.string   "stylesheet_content_type"
    t.integer  "stylesheet_file_size"
    t.datetime "stylesheet_updated_at"
    t.string   "javascript_content"
    t.string   "stylesheet_content"
  end

  add_index "implementations", ["library_id"], name: "index_implementations_on_library_id", using: :btree
  add_index "implementations", ["usecase_id"], name: "index_implementations_on_usecase_id", using: :btree

  create_table "libraries", force: :cascade do |t|
    t.string   "name"
    t.string   "url"
    t.text     "description"
    t.string   "version"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.boolean  "web_standard"
    t.string   "latest_version"
    t.string   "license"
    t.text     "support"
    t.text     "short"
  end

  create_table "usecases", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "author"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.text     "short"
    t.string   "javascript_file_name"
    t.string   "javascript_content_type"
    t.integer  "javascript_file_size"
    t.datetime "javascript_updated_at"
    t.string   "javascript_content"
  end

end
