class AddAttachmentJavascriptToImplementations < ActiveRecord::Migration
  def self.up
    change_table :implementations do |t|
      t.attachment :javascript
    end
  end

  def self.down
    remove_attachment :implementations, :javascript
  end
end
