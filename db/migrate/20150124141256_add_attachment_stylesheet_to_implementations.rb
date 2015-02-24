class AddAttachmentStylesheetToImplementations < ActiveRecord::Migration
  def self.up
    change_table :implementations do |t|
      t.attachment :stylesheet
    end
  end

  def self.down
    remove_attachment :implementations, :stylesheet
  end
end
